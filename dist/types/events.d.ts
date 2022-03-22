/**
 *  Contains all events form the custom messages in the go/cosmos KYVE implementation.
 */
export declare class MessageEvent {
    sender?: string;
    action?: string;
    module?: string;
    time?: Date;
    height?: number;
    args: any;
    private readonly eventsArray;
    constructor(eventsArray: any[], time: Date, height: number);
    private get;
}
