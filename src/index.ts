import { SigningStargateClient } from "@cosmjs/stargate";
import { KyveWallet } from "./wallet";
import { KYVE_DEFAULT_FEE } from "./utils/constants";
import registry from "./utils/registry";
import axios from "axios";

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

  async stake(
    id: number,
    amount: number,
    fee = KYVE_DEFAULT_FEE
  ): Promise<string> {
    const client = await this.getClient();
    const creator = await this.wallet.getAddress();

    const msg = {
      typeUrl: "/KYVENetwork.kyve.registry.MsgStakePool",
      value: {
        creator,
        id,
        amount,
      },
    };

    const tx = await client.signAndBroadcast(creator, [msg], fee);
    return tx.transactionHash;
  }
}
