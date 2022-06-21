import {
    KYVE_COSMOSTATION_CONFIG, KYVE_DECIMALS,
    KYVE_ENDPOINTS,
    KYVE_KEPLR_CONFIG,
    KYVE_NETWORK,
    Network,
    PREFIX, SUPPORTED_WALLETS,
} from "./constants";
import {getSigningKyveClient} from "./client/full-client";
import {DirectSecp256k1HdWallet} from "@cosmjs/proto-signing";
import {RequestAccountResponse, SignOptions} from "@cosmostation/extension-client/types/message";
import {cosmostationMethods, CosmostationSigner} from "./cosmostation-helper";
import {createKyveLCDClient} from "./client/kyveLCD.client";
import {ClientWebWallet} from "./types/clientWebWallet";
import {BigNumber} from "bignumber.js";
// @ts-ignore
import humanize from "humanize-number";

export default class KyveSDK {
    public readonly network: Network;
    private walletSupports: Set<keyof typeof SUPPORTED_WALLETS>;
    constructor(network: KYVE_NETWORK | Network) {
        this.walletSupports = new Set<keyof typeof SUPPORTED_WALLETS>()
        if (typeof network === "string") {
            this.network = KYVE_ENDPOINTS[network];
        } else {
            this.network = network;
        }
    }

    async fromMnemonic(mnemonic: string) {
        const signedClient = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
            prefix: PREFIX,
        });
        return getSigningKyveClient(this.network.rpc, signedClient);
    }

    async fromKepler(): Promise<ClientWebWallet> {
        if (typeof window === "undefined") throw new Error("Unsupported.");
        if (!window.keplr) throw new Error("Please install Keplr.");
        await window.keplr.experimentalSuggestChain({
            ...KYVE_KEPLR_CONFIG,
            rpc: this.network.rpc,
            rest: this.network.rest,
            chainId: this.network.chainId,
            chainName: this.network.chainName,
        });

        await window.keplr.enable(this.network.chainId);
        const signer = window.keplr.getOfflineSigner(this.network.chainId);
        const client = getSigningKyveClient(this.network.rpc, signer);
        this.walletSupports.add(SUPPORTED_WALLETS.KEPLER);
        const newClient = client as unknown as ClientWebWallet
        const walletName = (await window.keplr.getKey(this.network.chainId)).name
        newClient.getWalletName =  () => walletName;
        return newClient

    }

    async fromCosmostation(config?: SignOptions):Promise<ClientWebWallet> {
        if (typeof window === "undefined") throw new Error("Unsupported.");
        if (!window.cosmostation) throw new Error("Please install cosmostation.");
        const chain = await cosmostationMethods.getSupportedChains();
        let cosmostationAccount: RequestAccountResponse;
        if (chain.unofficial.includes(this.network.chainName.toLowerCase().trim())) {
            cosmostationAccount = await cosmostationMethods.requestAccount(this.network.chainName);
        } else {
            await cosmostationMethods.addChain({
                ...KYVE_COSMOSTATION_CONFIG,
                restURL: this.network.rest,
                chainId: this.network.chainId,
                chainName: this.network.chainName,
            })
            cosmostationAccount = await cosmostationMethods.requestAccount(this.network.chainName);
        }
        const cosmostationSigner = new CosmostationSigner(cosmostationAccount, this.network, config ? config : {});
        const client = await getSigningKyveClient(this.network.rpc, cosmostationSigner);
        const newClient = client as unknown as ClientWebWallet
        newClient.getWalletName = () => cosmostationAccount.name;
        this.walletSupports.add(SUPPORTED_WALLETS.COSMOSTATION);
        return newClient
    }

    async onAccountChange(cb: () => void) {
        if (this.walletSupports.has(SUPPORTED_WALLETS.COSMOSTATION))
            return window.cosmostation.tendermint.on("accountChanged", cb);
        if (this.walletSupports.has(SUPPORTED_WALLETS.KEPLER))
            return window.addEventListener("keplr_keystorechange", cb)
        throw new Error('Need to initiate from wallet')
    }

    createLCDClient() {
        return createKyveLCDClient(this.network.rest)
    }
    async generate() {
        const signer = await DirectSecp256k1HdWallet.generate(24, {
            prefix: PREFIX,
        });
        return getSigningKyveClient(this.network.rpc, signer);
    }

    formatBalance(balance: string, decimals: number = 2): string {
        return humanize(
            new BigNumber(balance)
                .dividedBy(new BigNumber(10).exponentiatedBy(KYVE_DECIMALS))
                .toFixed(decimals)
        );
    }
}
