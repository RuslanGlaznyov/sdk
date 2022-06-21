import {
  defaultRegistryTypes,
  GasPrice,
  SigningStargateClient,
} from "@cosmjs/stargate";
import { OfflineSigner, Registry } from "@cosmjs/proto-signing";
import * as KyveRegistryTx from "../registry/tx.registry";
import KyveClient from "./kyve.client";
import {Client} from "../types/client";

export async function getSigningKyveClient(
  rpcEndpoint: string,
  signer: OfflineSigner,
  defaultTypes = defaultRegistryTypes
) {
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
  return new KyveClient(newClient, account);
}
