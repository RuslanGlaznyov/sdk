import { EncodeObject } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { DeliverTxResponse } from "@cosmjs/stargate/build/stargateclient";
export declare class TxPromise {
    private nativeClient;
    private txBytes;
    readonly txHash: string;
    constructor(nativeClient: SigningStargateClient, txBytes: Uint8Array);
    execute(): Promise<DeliverTxResponse>;
    then(resolve: (arg: DeliverTxResponse) => void, reject: (arg: Error) => void): Promise<void>;
}
export declare function signTx(nativeClient: SigningStargateClient, address: string, tx: EncodeObject, options?: {
    fee?: StdFee | "auto" | number;
    memo?: string;
}): Promise<Uint8Array>;
