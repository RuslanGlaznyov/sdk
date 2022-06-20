import {
    KYVE_COSMOSTATION_CONFIG,
    KYVE_ENDPOINTS,
    KYVE_KEPLR_CONFIG,
    KYVE_NETWORK,
    Network,
    PREFIX,
} from "./constants";
import {getSigningKyveClient} from "./client/full-client";
import {DirectSecp256k1HdWallet, makeSignDoc} from "@cosmjs/proto-signing";
import {AccountData, OfflineDirectSigner} from "@cosmjs/proto-signing/build/signer";
import {SignDoc} from "cosmjs-types/cosmos/tx/v1beta1/tx";
import {RequestAccountResponse, SignOptions} from "@cosmostation/extension-client/types/message";
import cosmostationHelper from "./cosmostation-helper";

class CosmostationSigner implements OfflineDirectSigner {
    private network: Network;
    private cosmostationAccount: RequestAccountResponse;
    private cosmostationOption: SignOptions | undefined;

    constructor(cosmostationAccount: RequestAccountResponse, network: Network, cosmostationOption?: SignOptions) {
        this.network = network
        this.cosmostationAccount = cosmostationAccount;
        this.cosmostationOption = cosmostationOption
    }

    async getAccounts(): Promise<readonly AccountData[]> {
        return [{
            address: this.cosmostationAccount.address,
            // Currently, only secp256k1 is supported.
            algo: "secp256k1",
            pubkey: this.cosmostationAccount.publicKey
        }]
    };

    async signDirect(signerAddress: string, signDoc: SignDoc) {
        const signedResult = await cosmostationHelper.signDirect(this.network.chainId, {
            chain_id: signDoc.chainId,
            body_bytes: signDoc.bodyBytes,
            auth_info_bytes: signDoc.authInfoBytes,
            account_number: signDoc.accountNumber.toString()
        }, this.cosmostationOption)

        return {
            signed: makeSignDoc(signedResult.signed_doc.body_bytes, signedResult.signed_doc.auth_info_bytes, signedResult.signed_doc.chain_id, Number(signedResult.signed_doc.account_number)),
            signature: {
                pub_key: signedResult.pub_key,
                signature: signedResult.signature,
            }
        }
    }

}

export default class KyveSDK {
    public readonly network: Network;

    constructor(network: KYVE_NETWORK | Network) {
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

    async fromKepler() {
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
        return getSigningKyveClient(this.network.rpc, signer);
    }

    async fromCosmostation(config?: SignOptions) {
        if (!window.cosmostation) throw new Error("Please install cosmostation.");
        const chain = await cosmostationHelper.getSupportedChains();
        let cosmostationAccount: RequestAccountResponse;
        if (chain.unofficial.includes(this.network.chainName.toLowerCase().trim())) {
            cosmostationAccount = await cosmostationHelper.requestAccount(this.network.chainName);
        } else {
            await cosmostationHelper.addChain({
                ...KYVE_COSMOSTATION_CONFIG,
                restURL: this.network.rest,
                chainId: this.network.chainId,
                chainName: this.network.chainName,
            })
            cosmostationAccount = await cosmostationHelper.requestAccount(this.network.chainName);
        }
        const cosmostationSigner = new CosmostationSigner(cosmostationAccount, this.network, config ? config : {});
        return getSigningKyveClient(this.network.rpc, cosmostationSigner);
    }
}
