import {LCDKyveClientType} from "../../src/client/kyveLCD.client";
import KyveSDK from "../../src";
import {
    QueryAccountAssetsRequest,
    QueryAccountAssetsResponse,
    QueryAccountDelegationListRequest,
    QueryAccountDelegationListResponse,
    QueryAccountFundedListRequest,
    QueryAccountFundedListResponse,
    QueryAccountStakedListRequest,
    QueryAccountStakedListResponse,
    QueryCanProposeRequest,
    QueryCanProposeResponse,
    QueryCanVoteRequest,
    QueryCanVoteResponse,
    QueryDelegatorRequest,
    QueryDelegatorResponse,
    QueryDelegatorsByPoolAndStakerRequest,
    QueryDelegatorsByPoolAndStakerResponse,
    QueryFunderRequest,
    QueryFunderResponse,
    QueryFundersListRequest,
    QueryFundersListResponse,
    QueryParamsRequest,
    QueryParamsResponse,
    QueryPoolRequest,
    QueryPoolResponse,
    QueryPoolsRequest,
    QueryPoolsResponse,
    QueryProposalByHeightRequest,
    QueryProposalByHeightResponse,
    QueryProposalRequest,
    QueryProposalResponse,
    QueryProposalsRequest,
    QueryProposalsResponse,
    QueryStakeInfoRequest,
    QueryStakeInfoResponse,
    QueryStakerRequest,
    QueryStakerResponse,
    QueryStakersByPoolAndDelegatorRequest,
    QueryStakersByPoolAndDelegatorResponse,
    QueryStakersListRequest,
    QueryStakersListResponse,
} from "@kyve/proto/dist/proto/kyve/registry/v1beta1/query";
const TEST_NETWORK = 'korellia'

let lcdClient: LCDKyveClientType
beforeAll(async () => {
     const sdk = new KyveSDK(TEST_NETWORK);
    lcdClient = await sdk.createLCDClient()
})


test('test query `params`', async () => {
    const result = await lcdClient.kyve.params()
    console.log(result);
    // const data = await QueryPoolResponse.encode(result)
    // console.log(data);
    //@ts-ignore
    const data = QueryParamsResponse.encode(result)
    console.log(data);
    expect(true).toBeTruthy()
})