import { coins, IndexedTx, SigningStargateClient } from "@cosmjs/stargate";
import axios from "axios";
import { BigNumber } from "bignumber.js";
import { KYVE_DECIMALS, KYVE_DEFAULT_FEE } from "./utils/constants";
import { createRegistry } from "./utils/registry";
import { KyveWallet } from "./wallet";
import { sha256 } from "@cosmjs/crypto";
import { toHex } from "@cosmjs/encoding";
import * as bech32 from "bech32";
import { decodeTxRaw } from "@cosmjs/proto-signing";
import { FullDecodedTransaction } from "./types";
import { util } from "protobufjs";
import decode = util.base64.decode;

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
      typeUrl: "/KYVENetwork.kyve.registry.MsgCreatePool",
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
    id: number,
    amount: number,
    fee = KYVE_DEFAULT_FEE
  ): Promise<string> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/KYVENetwork.kyve.registry.MsgFundPool",
      value: {
        creator,
        id,
        amount,
      },
    };

    const tx = await client.signAndBroadcast(creator, [msg], fee);
    return tx.transactionHash;
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
   * getLogs from all blocks within the range "fromBlock" (inclusive) and "toBlock" (inclusive)
   * @param fromBlock (inclusive)
   * @param toBlock (inclusive)
   */
  async getLogs(
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

          const decodedRaw = decodeTxRaw(indexedTx.tx);
          fullDecodedTransaction.messages = [];

          for (const msg of decodedRaw.body.messages) {
            fullDecodedTransaction.messages.push({
              typeUrl: msg.typeUrl,
              value: client.registry.decode({
                typeUrl: msg.typeUrl,
                value: msg.value,
              }),
            });
          }

          fullDecodedTransaction.events = [];
          // Extract event logs
          for (const eventWrapper of JSON.parse(indexedTx.rawLog)) {
            for (const event of eventWrapper.events) {
              fullDecodedTransaction.events.push(event);
            }
          }
        }

        transactions.push(fullDecodedTransaction);
      }
    }

    return transactions;
  }

  isValidAddress(address: string): boolean {
    try {
      bech32.decode(address);
      return true;
    } catch {}
    return false;
  }
}
