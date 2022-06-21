import { OfflineSigner } from "@cosmjs/proto-signing";
import KyveClient from "./kyve.client";
import KyveWebClient from "./kyve.web.client";
export declare function getSigningKyveClient(rpcEndpoint: string, signer: OfflineSigner, walletName?: undefined, defaultTypes?: undefined): Promise<KyveClient>;
export declare function getSigningKyveClient(rpcEndpoint: string, signer: OfflineSigner, walletName?: string, defaultTypes?: undefined): Promise<KyveWebClient>;
