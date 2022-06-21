import {
  defaultRegistryTypes,
  GasPrice,
  SigningStargateClient,
} from "@cosmjs/stargate";
import {GeneratedType, OfflineSigner, Registry} from "@cosmjs/proto-signing";
import * as KyveRegistryTx from "../registry/tx.registry";
import KyveClient from "./kyve.client";
import {Client} from "../types/client";
import KyveWebClient from "./kyve.web.client";

export async function getSigningKyveClient(
    rpcEndpoint: string,
    signer: OfflineSigner,
    walletName?: undefined,
    defaultTypes?: undefined,
): Promise<KyveClient>;

export async function getSigningKyveClient(
    rpcEndpoint: string,
    signer: OfflineSigner,
    walletName?: string,
    defaultTypes?: undefined,
): Promise<KyveWebClient>;


// export function create<T extends string | number>(value: T): Value<T> // public signature
// export async function getSigningKyveClient<T extends  string | undefined>(
//     rpcEndpoint: string,
//     signer: OfflineSigner,
//     walletName: T,
//     defaultTypes?: ReadonlyArray<[string, GeneratedType]>): Promise<T extends string ? KyveWebClient : KyveClient>;
// export async function <T extends undefined | string>getSigningKyveClient(
//     rpcEndpoint: string,
//     signer: OfflineSigner,
//     walletName: T,
//     defaultTypes: undefined,
// ): Promise<T KyveClient>;
// type GetUser = <T extends DbUser | null>(dbUser: T) => T extends DbUser ? GqlUser : null;
export async function getSigningKyveClient(
  rpcEndpoint: string,
  signer: OfflineSigner,
  walletName?: string,
  defaultTypes = defaultRegistryTypes,

): Promise<KyveWebClient | KyveClient>{
  const registry = new Registry([...defaultTypes, ...KyveRegistryTx.registry]);
  const gasPrice = GasPrice.fromString("0tkyve");
  const client: SigningStargateClient =
    await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
      registry,
      gasPrice,
    });
  //@ts-ignore
  client.rpcEndpoint = rpcEndpoint;
  const newClient = client as Client;
  const [account] = await signer.getAccounts();
  if(typeof walletName === 'string')
    return new KyveWebClient(newClient, account, walletName)
  return new KyveClient(newClient, account);
}
