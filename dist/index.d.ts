import { KYVE_NETWORK, Network } from "./utils/constants";
import { Window as KeplrWindow } from "@keplr-wallet/types";
declare global {
    interface Window extends KeplrWindow {
    }
}
export default class KyveSDK {
    readonly network: Network;
    constructor(network: KYVE_NETWORK | Network);
    fromMnemonic(mnemonic: string): Promise<import("./client/kyve.client").default>;
    fromKepler(): Promise<import("./client/kyve.client").default>;
    fromCosmostation(): void;
}
