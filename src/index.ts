import { coins, SigningStargateClient } from "@cosmjs/stargate";
import KyveWallet from "./wallet";
import registry from "./utils/registry";

export class KyveSDK {
  public client?: SigningStargateClient;

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

  async fundPool(id: number, amount: number): Promise<string> {
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

    const fee = {
      amount: coins(0, "kyve"),
      gas: "200000",
    };

    const tx = await client.signAndBroadcast(creator, [msg], fee);
    return tx.transactionHash;
  }
}
