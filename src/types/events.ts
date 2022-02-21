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
    this.action = eventsArray.reverse().find((value) => value.key == "action").value;
    this.module = eventsArray.reverse().find((value) => value.key == "module").value;
    this.sender = eventsArray.reverse().find((value) => value.key == "sender").value;
    this.time = decodedTx.blockTime;
    this.height = decodedTx.indexedTx?.height;

    this.args = {};
    if (
      this.action == "Funded" ||
      this.action == "Defunded" ||
      this.args == "Staked" ||
      this.args == "Unstaked"
    ) {
      this.args.creator = this.get("Creator");
      this.args.poolId = this.get("Id");
      this.args.amount = this.get("Amount");
    } else
    if(this.action == "ProposalEnded") {
      this.args.bundleId = this.get("BundleId");
      this.args.byteSize = this.get("ByteSize");
      this.args.uploader = this.get("Uploader");
      this.args.nextUploader = this.get("NextUploader");
      this.args.bundleReward = this.get("BundleReward");
      this.args.valid = this.get("Valid");
      this.args.fromHeight = this.get("FromHeight");
      this.args.toHeight = this.get("ToHeight");
      this.args.status = this.get("Status");
    } else
    if (this.action == "Voted") {
      this.args.creator = this.get("Creator");
      this.args.poolId = this.get("Id");
      this.args.bundleId = this.get("BundleId");
      this.args.support = this.get("Support");
    }
  }

  private get(key: string) {
    return this.eventsArray.find((value) => value?.key == key).value;
  }
}
