import {
  AuthExtension,
  BankExtension,
  DistributionExtension,
  GovExtension,
  LcdClient,
  MintExtension,
  setupAuthExtension,
  setupBankExtension,
  setupDistributionExtension,
  setupGovExtension,
  setupMintExtension,
  setupSlashingExtension,
  setupStakingExtension,
  setupSupplyExtension,
  SupplyExtension,
  SlashingExtension,
  StakingExtension,
} from "@cosmjs/launchpad";
import axios from "axios";
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

type LCDClientType = LcdClient &
  AuthExtension &
  BankExtension &
  DistributionExtension &
  GovExtension &
  MintExtension &
  SlashingExtension &
  StakingExtension &
  SupplyExtension;
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export function createKyveLCDClient(restEndpoint: string) {
  const lcdClient = LcdClient.withExtensions(
    { apiUrl: restEndpoint },
    setupAuthExtension,
    setupBankExtension,
    setupDistributionExtension,
    setupGovExtension,
    setupMintExtension,
    setupSlashingExtension,
    setupStakingExtension,
    setupSupplyExtension
  ) as LCDClientType & { kyve: KyveLCDClient };
  lcdClient.kyve = new KyveLCDClient(restEndpoint);
  return lcdClient;
}

export class KyveLCDClient {
  private restEndpoint: string;
  private request: (url: string, params?: Record<string, any>) => Promise<any>;

  constructor(restEndpoint: string) {
    this.restEndpoint = restEndpoint;
    this.request = (url: string, params?: Record<string, any>) =>
      axios
        .get(new URL(url, this.restEndpoint).href, { params })
        .then((res) => res.data);
  }

  async params(): Promise<QueryParamsResponse> {
    const endpoint = `kyve/registry/v1beta1/params`;
    return await this.request(endpoint);
  }

  /* Pool queries a pool by ID. */
  async pool(params: QueryPoolRequest): Promise<QueryPoolResponse> {
    const endpoint = `kyve/registry/v1beta1/pool/${params.id}`;
    return await this.request(endpoint);
  }

  /* Pools queries for all pools. */
  async pools(params: QueryPoolsRequest): Promise<QueryPoolsResponse> {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }

    if (typeof params?.search !== "undefined") {
      parameters.search = params.search;
    }

    if (typeof params?.runtime !== "undefined") {
      parameters.runtime = params.runtime;
    }

    if (typeof params?.paused !== "undefined") {
      parameters.paused = params.paused;
    }

    const endpoint = `kyve/registry/v1beta1/pools`;
    return await this.request(endpoint, parameters);
  }

  /* FundersList returns all funder addresses with their corresponding funding amount for a given pool */
  async fundersList(
    params: QueryFundersListRequest
  ): Promise<QueryFundersListResponse> {
    const parameters: Record<string, any> = {};
    const endpoint = `kyve/registry/v1beta1/funders_list/${params.poolId}`;
    return await this.request(endpoint, parameters);
  }

  /* Funder returns all funder info */
  async funder(params: QueryFunderRequest): Promise<QueryFunderResponse> {
    const endpoint = `kyve/registry/v1beta1/funder/${params.poolId}/${params.funder}`;
    return await this.request(endpoint);
  }

  /* StakersList returns all staker addresses with their corresponding staking amount for a given pool */
  async stakersList(
    params: QueryStakersListRequest
  ): Promise<QueryStakersListResponse> {
    const endpoint = `kyve/registry/v1beta1/stakers_list/${params.poolId}`;
    return await this.request(endpoint);
  }

  /* Staker returns all staker info */
  async staker(params: QueryStakerRequest): Promise<QueryStakerResponse> {
    const endpoint = `kyve/registry/v1beta1/staker/${params.poolId}/${params.staker}`;
    return await this.request(endpoint);
  }

  /* Proposal ... */
  async proposal(params: QueryProposalRequest): Promise<QueryProposalResponse> {
    const endpoint = `kyve/registry/v1beta1/proposal/${params.bundleId}`;
    return await this.request(endpoint);
  }

  /* Proposals ... */
  async proposals(
    params: WithOptional<QueryProposalsRequest, "pagination">
  ): Promise<QueryProposalsResponse> {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }
    const endpoint = `kyve/registry/v1beta1/proposals/${params.poolId}`;
    return await this.request(endpoint);
  }

  /* ProposalByHeight ... */
  async proposalByHeight(
    params: QueryProposalByHeightRequest
  ): Promise<QueryProposalByHeightResponse> {
    const endpoint = `kyve/registry/v1beta1/proposal_by_height/${params.poolId}/${params.height}`;
    return await this.request(endpoint);
  }

  /* CanPropose ... */
  async canPropose(
    params: QueryCanProposeRequest
  ): Promise<QueryCanProposeResponse> {
    const endpoint = `kyve/registry/v1beta1/can_propose/${params.poolId}/${params.proposer}/${params.fromHeight}`;
    return await this.request(endpoint);
  }

  /* CanVote checks if voter on pool can still vote for the given bundle */
  async canVote(params: QueryCanVoteRequest): Promise<QueryCanVoteResponse> {
    const endpoint = `kyve/registry/v1beta1/can_vote/${params.poolId}/${params.voter}/${params.bundleId}`;
    return await this.request(endpoint);
  }

  /* StakeInfo returns necessary information to become a staker (used by the protocol nodes) */
  async stakeInfo(
    params: QueryStakeInfoRequest
  ): Promise<QueryStakeInfoResponse> {
    const endpoint = `kyve/registry/v1beta1/stake_info/${params.poolId}/${params.staker}`;
    return await this.request(endpoint);
  }

  /* AccountAssets returns an overview of the sum of all balances for a given user. e.g. balance, staking, funding, etc. */
  async accountAssets(
    params: QueryAccountAssetsRequest
  ): Promise<QueryAccountAssetsResponse> {
    const endpoint = `kyve/registry/v1beta1/account_assets/${params.address}`;
    return await this.request(endpoint);
  }

  /* AccountFundedList returns all pools the given user has funded into. */
  async accountFundedList(
    params: QueryAccountFundedListRequest
  ): Promise<QueryAccountFundedListResponse> {
    const endpoint = `kyve/registry/v1beta1/account_funded_list/${params.address}`;
    return await this.request(endpoint);
  }
  /* AccountStakedList ... */
  async accountStakedList(
    params: QueryAccountStakedListRequest
  ): Promise<QueryAccountStakedListResponse> {
    const endpoint = `kyve/registry/v1beta1/account_staked_list/${params.address}`;
    return await this.request(endpoint);
  }

  /* AccountDelegationList ... */
  async accountDelegationList(
    params: QueryAccountDelegationListRequest
  ): Promise<QueryAccountDelegationListResponse> {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }

    const endpoint = `kyve/registry/v1beta1/account_delegation_list/${params.address}`;
    return await this.request(endpoint, parameters);
  }

  /* Delegator returns all delegation info */
  async delegator(
    params: QueryDelegatorRequest
  ): Promise<QueryDelegatorResponse> {
    const endpoint = `kyve/registry/v1beta1/delegator/${params.poolId}/${params.staker}/${params.delegator}`;
    return await this.request(endpoint);
  }

  /* DelegatorsByPoolAndStaker ... */
  async delegatorsByPoolAndStaker(
    params: QueryDelegatorsByPoolAndStakerRequest
  ): Promise<QueryDelegatorsByPoolAndStakerResponse> {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }

    const endpoint = `kyve/registry/v1beta1/delegators_by_pool_and_staker/${params.poolId}/${params.staker}`;
    return await this.request(endpoint);
  }

  /* StakersByPoolAndDelegator ... */
  async stakersByPoolAndDelegator(
    params: QueryStakersByPoolAndDelegatorRequest
  ): Promise<QueryStakersByPoolAndDelegatorResponse> {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }

    const endpoint = `kyve/registry/v1beta1/stakers_by_pool_and_delegator/${params.poolId}/${params.delegator}`;
    return await this.request(endpoint);
  }
}
