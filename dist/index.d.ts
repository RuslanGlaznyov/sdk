import { KYVE_NETWORK, Network } from "./constants";
import { SignOptions } from "@cosmostation/extension-client/types/message";
export default class KyveSDK {
    readonly network: Network;
    constructor(network: KYVE_NETWORK | Network);
    fromMnemonic(mnemonic: string): Promise<import("./client/kyve.client").default>;
    fromKepler(): Promise<import("./client/kyve.client").default>;
    fromCosmostation(config?: SignOptions): Promise<import("./client/kyve.client").default>;
}
