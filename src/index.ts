import {
  coins,
  DeliverTxResponse,
  SigningStargateClient,
  StargateClient,
} from "@cosmjs/stargate";
import axios from "axios";
import { BigNumber } from "bignumber.js";
import { KYVE_DECIMALS, KYVE_DEFAULT_FEE } from "./utils/constants";
import { createRegistry } from "./utils/registry";
import { KyveWallet } from "./wallet";
import { sha256 } from "@cosmjs/crypto";
import { fromBase64, toHex } from "@cosmjs/encoding";
import { bech32 } from "bech32";
import { decodeTxRaw } from "@cosmjs/proto-signing";
import { FullDecodedTransaction } from "./types/transactions";
import { MessageEvent } from "./types/events";
import { verifyADR36Amino } from "@keplr-wallet/cosmos";
import { StdSignature } from "@cosmjs/launchpad/build/types";
import { pubkeyToAddress } from "@cosmjs/amino/build/addresses";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";

export { KYVE_DECIMALS } from "./utils/constants";
export { KyveWallet } from "./wallet";

interface PoolResponse {
  // TODO: Properly type this out ...
  Pool: any;
}

export class KyveSDK {
  private client?: SigningStargateClient;

  constructor(
    public readonly endpoint: string,
    private readonly wallet: KyveWallet
  ) {}

  async getClient(): Promise<SigningStargateClient> {
    if (!this.client) {
      this.client = await SigningStargateClient.connectWithSigner(
        this.endpoint,
        await this.wallet.getSigner(),
        { registry: await createRegistry() }
      );
    }

    return this.client;
  }

  async fetchPoolState(id: number): Promise<any> {
    const { data } = await axios.get<PoolResponse>(
      `${this.endpoint}/kyve/registry/pool/${id}`
    );
    return data.Pool;
  }

  async create(
    metadata: string,
    startHeight: number,
    bundleDelay: number,
    operatingCost: number,
    storageCost: number,
    bundleProposal: any,
    fee = KYVE_DEFAULT_FEE
  ): Promise<string> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/kyve.registry.v1beta1.MsgCreatePool",
      value: {
        creator,
        metadata,
        startHeight,
        bundleDelay,
        operatingCost,
        storageCost,
        bundleProposal,
      },
    };

    const tx = await client.signAndBroadcast(creator, [msg], fee);
    return tx.transactionHash;
  }

  async fund(
    id: number | string,
    amount: BigNumber,
    fee = KYVE_DEFAULT_FEE
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

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async defund(
    id: number | string,
    amount: BigNumber,
    fee = KYVE_DEFAULT_FEE
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

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async stake(
    id: number | string,
    amount: BigNumber,
    fee = KYVE_DEFAULT_FEE
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

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async unstake(
    id: number | string,
    amount: BigNumber,
    fee = KYVE_DEFAULT_FEE
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
    amount: BigNumber,
    fee = KYVE_DEFAULT_FEE
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
    amount: BigNumber,
    fee = KYVE_DEFAULT_FEE
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

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async withdrawRewards(
    id: number | string,
    staker: string,
    fee = KYVE_DEFAULT_FEE
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

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async govVote(
    id: number | string,
    option: number,
    fee = KYVE_DEFAULT_FEE
  ): Promise<{
    transactionHash: string;
    transactionBroadcast: Promise<DeliverTxResponse>;
  }> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/cosmos.gov.v1beta1.MsgVote",
      value: {
        proposal_id: id,
        voter: creator,
        option,
      },
    };

    const txRaw = await client.sign(creator, [msg], fee, "");
    const txBytes = TxRaw.encode(txRaw).finish();

    return {
      transactionHash: toHex(sha256(txBytes)).toUpperCase(),
      transactionBroadcast: client.broadcastTx(txBytes),
    };
  }

  async transfer(
    recipient: string,
    amount: number,
    fee = KYVE_DEFAULT_FEE
  ): Promise<string> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const parsedAmount = new BigNumber(amount)
      .multipliedBy(new BigNumber(10).pow(KYVE_DECIMALS))
      .toNumber();

    const tx = await client.sendTokens(
      creator,
      recipient,
      coins(parsedAmount, "kyve"),
      fee
    );
    return tx.transactionHash;
  }

  /**
   * get message-logs from all blocks within the range "fromBlock" (inclusive) and "toBlock" (inclusive)
   * @param fromBlock (inclusive)
   * @param toBlock (inclusive)
   */
  async getDecodedTransactions(
    fromBlock: number,
    toBlock: number
  ): Promise<FullDecodedTransaction[]> {
    const client = this.client ?? (await this.getClient());

    const transactions: FullDecodedTransaction[] = [];

    for (let i = fromBlock; i <= toBlock; i++) {
      const block = await client.getBlock(i);

      // Iterate transaction headers
      for (const encodedTransaction of block.txs) {
        // Calculate tx hash
        const id = toHex(sha256(encodedTransaction));

        const fullDecodedTransaction = new FullDecodedTransaction();

        // Fetch full transaction
        const indexedTx = await client.getTx(id);

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
            for (const eventWrapper of JSON.parse(indexedTx.rawLog)) {
              for (const event of eventWrapper.events) {
                fullDecodedTransaction.events.push(event);
              }
            }
          } catch (e) {}
        }

        transactions.push(fullDecodedTransaction);
      }
    }

    return transactions;
  }

  async getMessageEventLogs(
    fromBlock: number,
    toBlock: number
  ): Promise<MessageEvent[]> {
    const decodedTransactions = await this.getDecodedTransactions(
      fromBlock,
      toBlock
    );

    const events = [];

    for (const tx of decodedTransactions) {
      if (tx.events && tx.events.length > 0) {
        const eventsArray = tx.events.find((value) => value.type == "message")
          .attributes as any[];

        if (
          eventsArray.find((value) => value.key == "module") &&
          eventsArray.find((value) => value.key == "action") &&
          eventsArray.find((value) => value.key == "sender")
        ) {
          events.push(new MessageEvent(eventsArray, tx));
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
    if (window.keplr) {
      return window?.keplr.signArbitrary(
        "kyve",
        await this.wallet.getAddress(),
        message
      );
    }
    throw new Error("Keplr wallet not installed.");
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
}
