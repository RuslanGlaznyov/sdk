import { KYVE_NETWORK, Network } from "./constants";
import { SignOptions } from "@cosmostation/extension-client/types/message";
import { ClientWebWallet } from "./types/clientWebWallet";
export default class KyveSDK {
    readonly network: Network;
    private walletSupports;
    constructor(network: KYVE_NETWORK | Network);
    fromMnemonic(mnemonic: string): Promise<import("./client/kyve.client").default>;
    fromKepler(): Promise<ClientWebWallet>;
    fromCosmostation(config?: SignOptions): Promise<ClientWebWallet>;
    onAccountChange(cb: () => void): Promise<unknown>;
    createLCDClient(): import("@cosmjs/launchpad").LcdClient & import("@cosmjs/launchpad").AuthExtension & import("@cosmjs/launchpad").BankExtension & import("@cosmjs/launchpad").DistributionExtension & import("@cosmjs/launchpad").GovExtension & import("@cosmjs/launchpad").MintExtension & import("@cosmjs/launchpad").SlashingExtension & import("@cosmjs/launchpad").StakingExtension & import("@cosmjs/launchpad").SupplyExtension & {
        kyve: import("./client/kyveLCD.client").KyveLCDClient;
    };
}
