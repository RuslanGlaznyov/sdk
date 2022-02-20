/**
 *  Contains all events form the custom messages in the go/cosmos KYVE implementation.
 */
import { FullDecodedTransaction } from "./transactions";

export class MessageEvent {
  sender?: string;
  action?: string;
  module?: string;
  time?: Date;
  height?: number;
  args: any;

  private readonly eventsArray: any[];

  constructor(eventsArray: any[], decodedTx: FullDecodedTransaction) {
    this.eventsArray = eventsArray;
    this.action = eventsArray.find((value) => value.key == "action").value;
    this.module = eventsArray.find((value) => value.key == "module").value;
    this.sender = eventsArray.find((value) => value.key == "sender").value;
    this.time = decodedTx.blockTime;
    this.height = decodedTx.indexedTx?.height;

    this.args = {};
    if (
      this.action == "fund_pool" ||
      this.action == "defund_pool" ||
      this.args == "stake_pool" ||
      this.args == "unstake_pool"
    ) {
      this.args.creator = this.get("Creator");
      this.args.poolId = this.get("Id");
      this.args.amount = this.get("Amount");
    }
  }

  private get(key: string) {
    return this.eventsArray.find((value) => value?.key == key).value;
  }
}
