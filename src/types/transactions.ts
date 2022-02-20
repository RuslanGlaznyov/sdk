import { IndexedTx } from "@cosmjs/stargate";

export class FullDecodedTransaction {
  indexedTx?: IndexedTx;

  messages?: any[];

  events?: any[];

  blockNumber?: number;
  blockTime?: Date;
}
