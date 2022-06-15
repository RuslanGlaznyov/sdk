import {defaultRegistryTypes, SigningStargateClient,} from "@cosmjs/stargate";
import {OfflineSigner, Registry} from "@cosmjs/proto-signing";
import * as KyveRegistryTx from '../registry/tx.registry'
import KyveClient from "./kyve.client";

export async function getSigningKyveClient(rpcEndpoint: string, signer: OfflineSigner,
                                           defaultTypes = defaultRegistryTypes) {
    //TODO
    // - add support for Amino
    const registry = new Registry([
        ...defaultTypes,
        ...KyveRegistryTx.registry
    ]);
    const client: SigningStargateClient = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
        registry,
    });
    const [ account ] = await signer.getAccounts();
    const fullClient = client as SigningStargateClient & {
        kyve: KyveClient
    }
    fullClient.kyve = new KyveClient(client, account)
    return fullClient

}
