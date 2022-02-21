/**
 *  Contains all events form the custom messages in the go/cosmos KYVE implementation.
 */
import { FullDecodedTransaction } from "./transactions";
export declare class MessageEvent {
    sender?: string;
    action?: string;
    module?: string;
    time?: Date;
    height?: number;
    args: any;
    private readonly eventsArray;
    constructor(eventsArray: any[], decodedTx: FullDecodedTransaction);
    private get;
}
