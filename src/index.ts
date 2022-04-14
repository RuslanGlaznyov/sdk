import {
  coins,
  DeliverTxResponse,
  GasPrice,
  SigningStargateClient,
  StdFee,
} from "@cosmjs/stargate";
import axios from "axios";
import { BigNumber } from "bignumber.js";
import { KYVE_DECIMALS, KYVE_ENDPOINTS } from "./utils/constants";
import {
  CreatePoolProposal,
  createRegistry,
  ParameterChangeProposal,
  PausePoolProposal,
  TextProposal,
  UnpausePoolProposal,
  UpdatePoolProposal,
} from "./utils/registry";
import { KyveWallet } from "./wallet";
import { sha256 } from "@cosmjs/crypto";
import { fromBase64, toHex } from "@cosmjs/encoding";
import { bech32 } from "bech32";
import { decodeTxRaw, EncodeObject } from "@cosmjs/proto-signing";
import { FullDecodedTransaction } from "./types/transactions";
import { MessageEvent } from "./types/events";
import {
  cosmos,
  makeADR36AminoSignDoc,
  verifyADR36Amino,
} from "@keplr-wallet/cosmos";
import { StdSignature } from "@cosmjs/launchpad/build/types";
import { pubkeyToAddress } from "@cosmjs/amino/build/addresses";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import Long from "long";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";

export { KYVE_DECIMALS } from "./utils/constants";
export { KyveWallet } from "./wallet";

interface PoolResponse {
  // TODO: Properly type this out ...
  Pool: any;
}

export class KyveSDK {
  private client?: SigningStargateClient;

  constructor(readonly wallet: KyveWallet) {}

  async getClient(): Promise<SigningStargateClient> {
    if (!this.client) {
      const gasPrice = GasPrice.fromString("0tkyve");

      this.client = await SigningStargateClient.connectWithSigner(
        KYVE_ENDPOINTS[this.wallet.network].rpc,
        await this.wallet.getSigner(),
        { registry: await createRegistry(), gasPrice }
      );
    }

    return this.client;
  }

  async fetchPoolState(id: number): Promise<any> {
    const { data } = await axios.get<PoolResponse>(
      `${
        KYVE_ENDPOINTS[this.wallet.network].rest
      }/kyve/registry/v1beta1/pool/${id}`
    );
    return data.Pool;
  }

  async fund(
    id: number | string,
    amount: BigNumber
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgFundPool",
      value: {
        creator,
        id,
        amount: amount.toString(),
      },
    };

    const fee = await this.fetchFee([msg]);
    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async defund(
    id: number | string,
    amount: BigNumber
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgDefundPool",
      value: {
        creator,
        id,
        amount: amount.toString(),
      },
    };

    const fee = await this.fetchFee([msg]);
    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async stake(
    id: number | string,
    amount: BigNumber
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgStakePool",
      value: {
        creator,
        id,
        amount: amount.toString(),
      },
    };

    const fee = await this.fetchFee([msg]);
    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async unstake(
    id: number | string,
    amount: BigNumber
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgUnstakePool",
      value: {
        creator,
        id,
        amount: amount.toString(),
      },
    };

    const fee = await this.fetchFee([msg]);
    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async delegate(
    id: number | string,
    staker: string,
    amount: BigNumber
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgDelegatePool",
      value: {
        creator,
        id,
        staker,
        amount: amount.toString(),
      },
    };

    const fee = await this.fetchFee([msg]);
    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async undelegate(
    id: number | string,
    staker: string,
    amount: BigNumber
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgUndelegatePool",
      value: {
        creator,
        id,
        staker,
        amount: amount.toString(),
      },
    };

    const fee = await this.fetchFee([msg]);
    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async withdrawRewards(
    id: number | string,
    staker: string
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgWithdrawPool",
      value: {
        creator,
        id,
        staker,
      },
    };

    const fee = await this.fetchFee([msg]);
    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async updateMetadata(
    id: number | string,
    commission: string,
    moniker: string,
    website: string,
    logo: string
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgUpdateMetadata",
      value: {
        creator,
        id,
        commission,
        moniker,
        website,
        logo,
      },
    };

    const fee = await this.fetchFee([msg]);
    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async govSubmitProposal(
    type:
      | "TextProposal"
      | "ParameterChangeProposal"
      | "CreatePoolProposal"
      | "UpdatePoolProposal"
      | "PausePoolProposal"
      | "UnpausePoolProposal",
    content: Object,
    amount: BigNumber
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    let typeUrl: string;
    let encodedContent: Uint8Array;
    switch (type) {
      case "TextProposal":
        typeUrl = "/cosmos.gov.v1beta1.TextProposal";
        encodedContent = TextProposal.encode(content).finish();
        break;
      case "ParameterChangeProposal":
        typeUrl = "/cosmos.params.v1beta1.ParameterChangeProposal";
        encodedContent = ParameterChangeProposal.encode(content).finish();
        break;
      case "CreatePoolProposal":
        typeUrl = "/kyve.registry.v1beta1.CreatePoolProposal";
        encodedContent = CreatePoolProposal.encode(content).finish();
        break;
      case "UpdatePoolProposal":
        typeUrl = "/kyve.registry.v1beta1.UpdatePoolProposal";
        encodedContent = UpdatePoolProposal.encode(content).finish();
        break;
      case "PausePoolProposal":
        typeUrl = "/kyve.registry.v1beta1.PausePoolProposal";
        encodedContent = PausePoolProposal.encode(content).finish();
        break;
      case "UnpausePoolProposal":
        typeUrl = "/kyve.registry.v1beta1.UnpausePoolProposal";
        encodedContent = UnpausePoolProposal.encode(content).finish();
        break;
    }

    const msg = {
      typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
      value: {
        content: {
          typeUrl,
          value: encodedContent,
        },
        initialDeposit: coins(amount.toString(), "tkyve"),
        proposer: creator,
      },
    };

    const fee = await this.fetchFee([msg]);
    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async govDeposit(
    id: string,
    amount: BigNumber
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
      value: {
        proposalId: Long.fromString(id),
        depositor: creator,
        amount: coins(amount.toString(), "tkyve"),
      },
    };

    const fee = await this.fetchFee([msg]);
    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async govVote(
    id: string,
    option: "Yes" | "Abstain" | "No" | "NoWithVeto"
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    let _option = cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_UNSPECIFIED;
    switch (option) {
      case "Yes":
        _option = cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_YES;
        break;
      case "Abstain":
        _option = cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_ABSTAIN;
        break;
      case "No":
        _option = cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_NO;
        break;
      case "NoWithVeto":
        _option = cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_NO_WITH_VETO;
        break;
    }

    const msg = {
      typeUrl: "/cosmos.gov.v1beta1.MsgVote",
      value: {
        proposalId: Long.fromString(id),
        voter: creator,
        option: _option,
      },
    };

    const fee = await this.fetchFee([msg]);
    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async submitBundleProposal(
    id: number | string,
    bundleId: string,
    byteSize: number,
    bundleSize: number
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgSubmitBundleProposal",
      value: {
        creator,
        id,
        bundleId,
        byteSize,
        bundleSize,
      },
    };

    const fee = await this.fetchFee([msg]);
    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async voteProposal(
    id: number | string,
    bundleId: string,
    support: boolean
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgVoteProposal",
      value: {
        creator,
        id,
        bundleId,
        support,
      },
    };

    const fee = await this.fetchFee([msg]);
    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async claimUploaderRole(id: number | string): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgClaimUploaderRole",
      value: {
        creator,
        id,
      },
    };

    const fee = await this.fetchFee([msg]);
    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async transfer(recipient: string, amount: number): Promise<string> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const parsedAmount = new BigNumber(amount)
      .multipliedBy(new BigNumber(10).pow(KYVE_DECIMALS))
      .toNumber();

    const tx = await client.sendTokens(
      creator,
      recipient,
      coins(parsedAmount, "tkyve"),
      "auto"
    );
    return tx.transactionHash;
  }

  async getMessageEventLogs(
    fromBlock: number,
    toBlock: number
  ): Promise<MessageEvent[]> {
    const client = this.client ?? (await this.getClient());

    const tendermint = await Tendermint34Client.connect(
      KYVE_ENDPOINTS[this.wallet.network].rpc
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

  isValidAddress(address: string): boolean {
    try {
      bech32.decode(address);
      return true;
    } catch {}
    return false;
  }

  async signString(message: string): Promise<StdSignature> {
    const address = await this.wallet.getAddress();

    if (typeof window !== "undefined") {
      if (window.keplr) {
        return window.keplr.signArbitrary(
          this.wallet.getChainId(),
          address,
          message
        );
      } else {
        throw new Error("Please install Keplr.");
      }
    } else {
      const signDoc = makeADR36AminoSignDoc(address, message);
      const signer = await this.wallet.getAminoSigner();

      const { signature } = await signer.signAmino(address, signDoc);
      return signature;
    }
  }

  async verifyString(
    signature: string,
    data: string,
    pubKey: string
  ): Promise<boolean> {
    return verifyADR36Amino(
      "kyve",
      this.getAddressFromPubKey(pubKey),
      new TextEncoder().encode(data),
      fromBase64(pubKey),
      fromBase64(signature)
    );
  }

  getAddressFromPubKey(pubKey: string) {
    return pubkeyToAddress(
      { type: "tendermint/PubKeySecp256k1", value: pubKey },
      "kyve"
    );
  }

  private async fetchFee(messages: EncodeObject[]): Promise<StdFee> {
    const client = await this.getClient();
    const signer = await this.wallet.getAddress();

    // TODO: Make memo and multiplier more dynamic.
    const estimation = await client.simulate(signer, messages, "");
    const multiplier = 1.5;

    return {
      amount: coins(0, "tkyve"),
      gas: Math.floor(estimation * multiplier).toString(),
    };
  }
}
