import { coins, SigningStargateClient } from "@cosmjs/stargate";
import axios from "axios";
import { BigNumber } from "bignumber.js";
import { KYVE_DECIMALS, KYVE_DEFAULT_FEE } from "./utils/constants";
import registry from "./utils/registry";
import { KyveWallet } from "./wallet";

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
        { registry }
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

  async isValidAddress(address: string) {
    const client = await this.getClient();
    try {
      const account = await client.getAccount(address);
      return true;
    } catch (e) {
      return false;
    }
  }
}
