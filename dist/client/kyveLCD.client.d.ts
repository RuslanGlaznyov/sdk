import { AuthExtension, BankExtension, DistributionExtension, GovExtension, LcdClient, MintExtension, SupplyExtension, SlashingExtension, StakingExtension } from "@cosmjs/launchpad";
import { QueryAccountAssetsRequest, QueryAccountAssetsResponse, QueryAccountDelegationListRequest, QueryAccountDelegationListResponse, QueryAccountFundedListRequest, QueryAccountFundedListResponse, QueryAccountStakedListRequest, QueryAccountStakedListResponse, QueryCanProposeRequest, QueryCanProposeResponse, QueryCanVoteRequest, QueryCanVoteResponse, QueryDelegatorRequest, QueryDelegatorResponse, QueryDelegatorsByPoolAndStakerRequest, QueryDelegatorsByPoolAndStakerResponse, QueryFunderRequest, QueryFunderResponse, QueryFundersListRequest, QueryFundersListResponse, QueryParamsResponse, QueryPoolRequest, QueryPoolResponse, QueryPoolsRequest, QueryPoolsResponse, QueryProposalByHeightRequest, QueryProposalByHeightResponse, QueryProposalRequest, QueryProposalResponse, QueryProposalsRequest, QueryProposalsResponse, QueryStakeInfoRequest, QueryStakeInfoResponse, QueryStakerRequest, QueryStakerResponse, QueryStakersByPoolAndDelegatorRequest, QueryStakersByPoolAndDelegatorResponse, QueryStakersListRequest, QueryStakersListResponse } from "@kyve/proto/dist/proto/kyve/registry/v1beta1/query";
declare type LCDClientType = LcdClient & AuthExtension & BankExtension & DistributionExtension & GovExtension & MintExtension & SlashingExtension & StakingExtension & SupplyExtension;
declare type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare type LCDKyveClientType = LCDClientType & {
    kyve: KyveLCDClient;
};
export declare function createKyveLCDClient(restEndpoint: string): LCDKyveClientType;
export declare class KyveLCDClient {
    private restEndpoint;
    private request;
    constructor(restEndpoint: string);
    params(): Promise<QueryParamsResponse>;
    pool(params: QueryPoolRequest): Promise<QueryPoolResponse>;
    pools(params: QueryPoolsRequest): Promise<QueryPoolsResponse>;
    fundersList(params: QueryFundersListRequest): Promise<QueryFundersListResponse>;
    funder(params: QueryFunderRequest): Promise<QueryFunderResponse>;
    stakersList(params: QueryStakersListRequest): Promise<QueryStakersListResponse>;
    staker(params: QueryStakerRequest): Promise<QueryStakerResponse>;
    proposal(params: QueryProposalRequest): Promise<QueryProposalResponse>;
    proposals(params: WithOptional<QueryProposalsRequest, "pagination">): Promise<QueryProposalsResponse>;
    proposalByHeight(params: QueryProposalByHeightRequest): Promise<QueryProposalByHeightResponse>;
    canPropose(params: QueryCanProposeRequest): Promise<QueryCanProposeResponse>;
    canVote(params: QueryCanVoteRequest): Promise<QueryCanVoteResponse>;
    stakeInfo(params: QueryStakeInfoRequest): Promise<QueryStakeInfoResponse>;
    accountAssets(params: QueryAccountAssetsRequest): Promise<QueryAccountAssetsResponse>;
    accountFundedList(params: QueryAccountFundedListRequest): Promise<QueryAccountFundedListResponse>;
    accountStakedList(params: QueryAccountStakedListRequest): Promise<QueryAccountStakedListResponse>;
    accountDelegationList(params: QueryAccountDelegationListRequest): Promise<QueryAccountDelegationListResponse>;
    delegator(params: QueryDelegatorRequest): Promise<QueryDelegatorResponse>;
    delegatorsByPoolAndStaker(params: QueryDelegatorsByPoolAndStakerRequest): Promise<QueryDelegatorsByPoolAndStakerResponse>;
    stakersByPoolAndDelegator(params: QueryStakersByPoolAndDelegatorRequest): Promise<QueryStakersByPoolAndDelegatorResponse>;
}
export {};
