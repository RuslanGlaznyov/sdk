import {AddChainParams} from "@cosmostation/extension-client/types/message";

export default {
    getSupportedChains() {
        return window.cosmostation.tendermint.request({ method: "ten_supportedChainNames" })
    },
    addChain(params: AddChainParams) {
      return window.cosmostation.tendermint.request({
          method: "ten_addChain",
          params
      })
    },
    requestAccount(chainId: string) {
        return window.cosmostation.tendermint.request({
            method: "ten_requestAccount",
            params: { chainName: chainId },
        });
    },
    signDirect(chainName: string, doc: Object, options?: Object) {
        return window.cosmostation.tendermint.request({
            method: "ten_signDirect",
            params: {
                chainName,
                doc,
                ...options
            },
        });
    }
}