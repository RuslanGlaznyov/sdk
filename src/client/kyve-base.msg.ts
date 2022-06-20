import {
  MsgClaimUploaderRole,
  MsgDefundPool,
  MsgDelegatePool,
  MsgFundPool,
  MsgStakePool,
  MsgSubmitBundleProposal,
  MsgUndelegatePool,
  MsgUnstakePool,
  MsgUpdateMetadata,
  MsgVoteProposal,
  MsgWithdrawPool,
} from "@kyve/proto/dist/proto/kyve/registry/v1beta1/tx";
import { coins } from "@cosmjs/stargate";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { withTypeUrl } from "../registry/tx.registry";
import { AccountData } from "@cosmjs/amino/build/signer";
import { BigNumber } from "bignumber.js";
import { KYVE_DECIMALS } from "../constants";
import { MessageEvent } from "../types/events";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { toHex } from "@cosmjs/encoding";
import { sha256 } from "@cosmjs/crypto";
import { FullDecodedTransaction } from "../types/transactions";
import { decodeTxRaw } from "@cosmjs/proto-signing";
import { extendedClientType } from "./faces";
import { DENOM } from "../constants";

export default class KyveBaseMsg {
  private nativeClient: extendedClientType;
  public readonly account: AccountData;

  constructor(client: extendedClientType, account: AccountData) {
    this.account = account;
    this.nativeClient = client;
  }

  public foundPool(
    value: MsgFundPool,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const tx = withTypeUrl.fundPool(value);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public defundPool(
    value: MsgDefundPool,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const tx = withTypeUrl.defundPool(value);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public stakePool(
    value: MsgStakePool,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const tx = withTypeUrl.stakePool(value);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public unstakePool(
    value: MsgUnstakePool,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const tx = withTypeUrl.unstakePool(value);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public delegatePool(
    value: MsgDelegatePool,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const tx = withTypeUrl.delegatePool(value);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public withdrawPool(
    value: MsgWithdrawPool,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const tx = withTypeUrl.withdrawPool(value);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  //submitBundleProposal
  public undelegatePool(
    value: MsgUndelegatePool,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const tx = withTypeUrl.undelegatePool(value);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public submitBundleProposal(
    value: MsgSubmitBundleProposal,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const tx = withTypeUrl.submitBundleProposal(value);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public voteProposal(
    value: Omit<MsgVoteProposal, "creator">,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const newValue = value as MsgVoteProposal;
    newValue.creator = this.account.address;
    const tx = withTypeUrl.voteProposal(newValue);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public claimUploaderRole(
    value: MsgClaimUploaderRole,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const tx = withTypeUrl.claimUploaderRole(value);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  public updateMetadata(
    value: MsgUpdateMetadata,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const tx = withTypeUrl.updateMetadata(value);
    return this.nativeClient.signAndBroadcast(
      this.account.address,
      [tx],
      fee ? fee : "auto",
      memo
    );
  }

  async transfer(
    recipient: string,
    amount: string,
    fee?: StdFee | "auto" | number,
    memo?: string
  ) {
    const parsedAmount = new BigNumber(amount)
      .multipliedBy(new BigNumber(10).pow(KYVE_DECIMALS))
      .toNumber();

    return this.nativeClient.sendTokens(
      this.account.address,
      recipient,
      coins(parsedAmount, DENOM),
      fee ? fee : "auto",
      memo
    );
  }
  //TODO refactor it :) !
  async getMessageEventLogs(
    fromBlock: number,
    toBlock: number
  ): Promise<MessageEvent[]> {
    const client = this.nativeClient;
    const tendermint = await Tendermint34Client.connect(
      this.nativeClient.rpcEndpoint
    );

    const events = [];

    for (let i = fromBlock; i <= toBlock; i++) {
      const block = await client.getBlock(i);
      let blockResult;
      try {
        blockResult = await tendermint.blockResults(i);
      } catch (e) {
        events.push(
          new MessageEvent(
            [
              { key: "action", value: "ParsingError" },
              { key: "stacktrace", value: JSON.stringify(e) },
            ],
            new Date(block.header.time),
            block.header.height
          )
        );
      }

      // Iterate transaction headers
      for (const encodedTransaction of block.txs) {
        // Calculate tx hash
        const id = toHex(sha256(encodedTransaction));

        const fullDecodedTransaction = new FullDecodedTransaction();

        // Fetch full transaction
        let indexedTx = null;
        try {
          indexedTx = await client.getTx(id);
        } catch (e) {
          events.push(
            new MessageEvent(
              [
                { key: "action", value: "ParsingError" },
                { key: "stacktrace", value: JSON.stringify(e) },
              ],
              new Date(block.header.time),
              block.header.height
            )
          );
        }

        if (indexedTx != null) {
          fullDecodedTransaction.indexedTx = indexedTx;

          fullDecodedTransaction.blockTime = new Date(block.header.time);
          fullDecodedTransaction.blockNumber = block.header.height;

          const decodedRaw = decodeTxRaw(indexedTx.tx);
          fullDecodedTransaction.messages = [];

          for (const msg of decodedRaw.body.messages) {
            if (msg.typeUrl.startsWith("/kyve")) {
              fullDecodedTransaction.messages.push({
                typeUrl: msg.typeUrl,
                value: client.registry.decode({
                  typeUrl: msg.typeUrl,
                  value: msg.value,
                }),
              });
            }
          }

          fullDecodedTransaction.events = [];
          // Extract event logs

          try {
            const rawEventsArrays = [];

            for (const eventWrapper of JSON.parse(indexedTx.rawLog)) {
              for (const event of eventWrapper.events) {
                rawEventsArrays.push(event);
              }
            }

            for (const ev of rawEventsArrays) {
              if (ev.type == "message") {
                const kyveEvent = ev.attributes.filter(
                  (value: { key: string }) => value.key == "EventName"
                ).length;

                if (kyveEvent == 0) {
                  events.push(
                    new MessageEvent(
                      ev.attributes,
                      fullDecodedTransaction.blockTime!,
                      fullDecodedTransaction.blockNumber!
                    )
                  );
                  fullDecodedTransaction.events.push(ev.attributes);
                } else {
                  // First two entries are sender and action
                  let tx_sender = ev.attributes.find(
                    (value: any) => value.key == "sender"
                  ) ?? { key: "sender", value: "" };
                  let tx_action = ev.attributes.find(
                    (value: any) => value.key == "action"
                  ) ?? { key: "sender", value: "" };

                  let singleEventArray = [tx_sender, tx_action];

                  for (const attr of ev.attributes.reverse()) {
                    singleEventArray.push(attr);
                    if (attr.key == "EventName") {
                      if (singleEventArray.length > 2) {
                        events.push(
                          new MessageEvent(
                            singleEventArray,
                            fullDecodedTransaction.blockTime!,
                            fullDecodedTransaction.blockNumber!
                          )
                        );
                        fullDecodedTransaction.events.push(singleEventArray);
                      }
                      singleEventArray = [tx_sender, tx_action];
                    }
                  }
                }
              }
            }
          } catch (e) {}
        }
      }

      // Iterate EndBlockEvents
      if (blockResult != undefined) {
        const eventsMessages = blockResult.endBlockEvents.filter(
          (value) => value.type == "message"
        );

        const attributes = [];
        for (const ev of eventsMessages) {
          attributes.push(...ev.attributes);
        }

        if (attributes.length > 0) {
          const decoder = new TextDecoder();

          const decodedEvents = [];
          for (const ev of attributes) {
            decodedEvents.push({
              key: decoder.decode(ev.key),
              value: decoder.decode(ev.value),
            });
          }

          const kyveEvent = decodedEvents.filter(
            (value: { key: string }) => value.key == "EventName"
          ).length;

          if (kyveEvent == 0) {
            events.push(
              new MessageEvent(
                decodedEvents,
                new Date(block.header.time),
                blockResult.height
              )
            );
          } else {
            // First two entries are sender and action
            let tx_sender = decodedEvents.find(
              (value: any) => value.key == "sender"
            ) ?? { key: "sender", value: "" };
            let tx_action = decodedEvents.find(
              (value: any) => value.key == "action"
            ) ?? { key: "sender", value: "" };

            let singleEventArray = [tx_sender, tx_action];

            for (const attr of decodedEvents.reverse()) {
              singleEventArray.push(attr);
              if (attr.key == "EventName") {
                if (singleEventArray.length > 2) {
                  events.push(
                    new MessageEvent(
                      singleEventArray,
                      new Date(block.header.time),
                      blockResult.height
                    )
                  );
                }
                singleEventArray = [tx_sender, tx_action];
              }
            }
          }
        }
      }
    }

    return events;
  }
}
