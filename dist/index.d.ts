import { KYVE_NETWORK, Network } from "./constants";
import { SignOptions } from "@cosmostation/extension-client/types/message";
import KyveWebClient from "./client/kyve.web.client";
import KyveClient from "./client/kyve.client";
/** Class representing a KyveSDK. */
export default class KyveSDK {
    readonly network: Network;
    private walletSupports;
    /**
     * Create sdk instance.
     * @param network - The network type, e.g mainnet, testnet, etc
     */
    constructor(network: KYVE_NETWORK | Network);
    /**
     * Create a client from mnemonic
     * @param mnemonic
     * @return Promise<KyveClient>
     */
    fromMnemonic(mnemonic: string): Promise<KyveClient>;
    /**
     * Crate a client from Keplr wallet if installed
     * @return Promise<KyveWebClient>
     */
    fromKeplr(): Promise<KyveWebClient>;
    /**
     * Crate a client from Cosmostaion wallet if installed
     * @return Promise<KyveWebClient>
     */
    fromCosmostation(config?: SignOptions): Promise<KyveWebClient>;
    /**
     * Listener to detect if account in wallet changed, support fromKeplr and fromCosmostation  instances
     * @param cb
     */
    onAccountChange(cb: () => void): Promise<unknown>;
    /**
     * create LCD client to get data from Rest api
     */
    createLCDClient(): import("@cosmjs/launchpad").LcdClient & import("@cosmjs/launchpad").AuthExtension & import("@cosmjs/launchpad").BankExtension & import("@cosmjs/launchpad").DistributionExtension & import("@cosmjs/launchpad").GovExtension & import("@cosmjs/launchpad").MintExtension & import("@cosmjs/launchpad").SlashingExtension & import("@cosmjs/launchpad").StakingExtension & import("@cosmjs/launchpad").SupplyExtension & {
        kyve: import("./client/kyveLCD.client").KyveLCDClient;
    };
    /**
     * generate KyveClient instance without mnemonic
     */
    generate(): Promise<KyveClient>;
    formatBalance(balance: string, decimals?: number): string;
}
