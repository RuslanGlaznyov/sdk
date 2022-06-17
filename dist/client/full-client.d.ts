import { OfflineSigner } from "@cosmjs/proto-signing";
import KyveClient from "./kyve.client";
export declare function getSigningKyveClient(rpcEndpoint: string, signer: OfflineSigner, defaultTypes?: readonly [string, import("@cosmjs/proto-signing").GeneratedType][]): Promise<KyveClient>;
