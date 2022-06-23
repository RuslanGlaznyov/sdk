import { LCDKyveClientType } from "../../src/client/kyveLCD.client";
import KyveSDK from "../../src";
import * as TJS from "typescript-json-schema";
import { resolve } from "path";
import { JsonSchemaGenerator } from "typescript-json-schema/typescript-json-schema";
import AJV from "ajv";
import { ErrorObject } from "ajv/lib/types";
import { Definition } from "typescript-json-schema";
const TEST_NETWORK = "korellia";
const PATH_TO_QUERY_TYPES =
  "./node_modules/@kyve/proto/dist/proto/kyve/registry/v1beta1/query";
const TEST_HEIGHT = "1000000";
/** TYPESCRIPT TO JSON SCHEMA SET UP **/

// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
  required: true,
  noExtraProps: true,
};

// optionally pass ts compiler options
const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: false,
  additionalProperties: false,
};

const program = TJS.getProgramFromFiles(
  [resolve(PATH_TO_QUERY_TYPES)],
  compilerOptions
);
/** END TYPESCRIPT TO JSON SCHEMA SET UP **/
let lcdClient: LCDKyveClientType;
let typeQuerySchemas: JsonSchemaGenerator;
let ajv: AJV;

beforeAll(async () => {
  const sdk = new KyveSDK(TEST_NETWORK);
  lcdClient = await sdk.createLCDClient();
  typeQuerySchemas = TJS.buildGenerator(
    program,
    settings
  ) as unknown as JsonSchemaGenerator;
  ajv = new AJV({ strict: true });
  if (!typeQuerySchemas) {
    throw new Error("Can't find query type to generate JSON schema ");
  }
});

function validate(
  schema: Definition,
  data: any
): { valid: boolean; errors: ErrorObject[] | null } {
  const validate = ajv.compile(schema);
  validate(data);
  if (validate.errors)
    return {
      valid: false,
      errors: validate.errors,
    };
  return {
    valid: true,
    errors: null,
  };
}

it("Query <params>", async () => {
  const result = await lcdClient.kyve.params();
  const schema = typeQuerySchemas.getSchemaForSymbol("QueryParamsResponse");
  const validationResult = validate(schema, result);
  expect(validationResult.valid).toBeTruthy();
});

it("Query <pools> and <pool> by id", async () => {
  const poolsResponse = await lcdClient.kyve.pools();
  const schema = typeQuerySchemas.getSchemaForSymbol("QueryPoolsResponse");
  //do not test pagination property
  delete schema.properties?.pagination;
  delete poolsResponse.pagination;
  const vResult = validate(schema, poolsResponse);
  expect(vResult.valid).toBeTruthy();
  // jest doesn't support nested generative test, needs a solution how to split into separate test cases
  // maybe another test runner?
  for (let pool of poolsResponse.pools) {
    const poolsResponse = await lcdClient.kyve.pool({ id: pool.id });
    const schema = typeQuerySchemas.getSchemaForSymbol("QueryPoolResponse");
    const vResult = validate(schema, poolsResponse);
    expect(vResult.valid).toBeTruthy();
  }
});

it("Query <fundersList>", async () => {
  const poolsResponse = await lcdClient.kyve.pools();
  const schema = typeQuerySchemas.getSchemaForSymbol(
    "QueryFundersListResponse"
  );
  for (let pool of poolsResponse.pools) {
    const poolsResponse = await lcdClient.kyve.fundersList({
      pool_id: pool.id,
    });
    const vResult = validate(schema, poolsResponse);
    expect(vResult.valid).toBeTruthy();
  }
});
it("Query <funder>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const founders = await lcdClient.kyve.fundersList({
    pool_id: pool.pools[0].id,
  });
  const founder = await lcdClient.kyve.funder({
    pool_id: pool.pools[0].id,
    funder: founders.funders[0].account,
  });
  const schema = typeQuerySchemas.getSchemaForSymbol("QueryFunderResponse");
  const vResult = validate(schema, founder);
  expect(vResult.valid).toBeTruthy();
});

it("Query <stakersList>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const stakers = await lcdClient.kyve.stakersList({
    pool_id: pool.pools[0].id,
  });
  const schema = typeQuerySchemas.getSchemaForSymbol(
    "QueryStakersListResponse"
  );
  const vResult = validate(schema, stakers);
  expect(vResult.valid).toBeTruthy();
});

it("Query <staker>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const stakersListResponse = await lcdClient.kyve.stakersList({
    pool_id: pool.pools[0].id,
  });
  const stakerResponse = await lcdClient.kyve.staker({
    pool_id: pool.pools[0].id,
    staker: stakersListResponse.stakers[0].staker,
  });
  const schema = typeQuerySchemas.getSchemaForSymbol("QueryStakerResponse");
  const vResult = validate(schema, stakerResponse);
  expect(vResult.valid).toBeTruthy();
});

it("Query <proposals>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const proposals = await lcdClient.kyve.proposals({
    pool_id: pool.pools[0].id,
  });
  const schema = typeQuerySchemas.getSchemaForSymbol("QueryProposalsResponse");
  //do not test pagination property
  delete schema.properties?.pagination;
  delete proposals.pagination;
  const vResult = validate(schema, proposals);
  expect(vResult.valid).toBeTruthy();
});

it("Query <proposal>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const proposals = await lcdClient.kyve.proposals({
    pool_id: pool.pools[0].id,
  });
  const proposal = await lcdClient.kyve.proposal({
    bundle_id: proposals.proposals[0].bundle_id,
  });
  const schema = typeQuerySchemas.getSchemaForSymbol("QueryProposalResponse");
  const vResult = validate(schema, proposal);
  expect(vResult.valid).toBeTruthy();
});

it("Query <proposalByHeight>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const proposalByHeightResponse = await lcdClient.kyve.proposalByHeight({
    pool_id: pool.pools[0].id,
    height: TEST_HEIGHT,
  });
  const schema = typeQuerySchemas.getSchemaForSymbol(
    "QueryProposalByHeightResponse"
  );
  const vResult = validate(schema, proposalByHeightResponse);
  expect(vResult.valid).toBeTruthy();
});

it("Query <canPropose>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const stakersListResponse = await lcdClient.kyve.stakersList({
    pool_id: pool.pools[0].id,
  });
  const canProposeRes = await lcdClient.kyve.canPropose({
    pool_id: pool.pools[0].id,
    proposer: stakersListResponse.stakers[0].staker,
    from_height: TEST_HEIGHT,
  });
  const schema = typeQuerySchemas.getSchemaForSymbol("QueryCanProposeResponse");
  const vResult = validate(schema, canProposeRes);
  expect(vResult.valid).toBeTruthy();
});

it("Query <canVote>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const stakersListResponse = await lcdClient.kyve.stakersList({
    pool_id: pool.pools[0].id,
  });
  const proposals = await lcdClient.kyve.proposals({
    pool_id: pool.pools[0].id,
  });
  const canVoteRes = await lcdClient.kyve.canVote({
    pool_id: pool.pools[0].id,
    voter: stakersListResponse.stakers[0].staker,
    bundle_id: proposals.proposals[0].bundle_id,
  });
  const schema = typeQuerySchemas.getSchemaForSymbol("QueryCanVoteResponse");
  const vResult = validate(schema, canVoteRes);
  expect(vResult.valid).toBeTruthy();
});

it("Query <stakeInfo>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const stakersListResponse = await lcdClient.kyve.stakersList({
    pool_id: pool.pools[0].id,
  });
  const stakeInfoRes = await lcdClient.kyve.stakeInfo({
    pool_id: pool.pools[0].id,
    staker: stakersListResponse.stakers[0].staker,
  });
  const schema = typeQuerySchemas.getSchemaForSymbol("QueryStakeInfoResponse");
  const vResult = validate(schema, stakeInfoRes);
  expect(vResult.valid).toBeTruthy();
});

it("Query <accountAssets>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const stakersListResponse = await lcdClient.kyve.stakersList({
    pool_id: pool.pools[0].id,
  });
  const accountAssetsRes = await lcdClient.kyve.accountAssets({
    address: stakersListResponse.stakers[0].account,
  });
  const schema = typeQuerySchemas.getSchemaForSymbol(
    "QueryAccountAssetsResponse"
  );
  const vResult = validate(schema, accountAssetsRes);
  expect(vResult.valid).toBeTruthy();
});

it("Query <accountFundedList>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const foundersRes = await lcdClient.kyve.fundersList({
    pool_id: pool.pools[0].id,
  });
  const accountFundedListRes = await lcdClient.kyve.accountFundedList({
    address: foundersRes.funders[0].account,
  });
  const schema = typeQuerySchemas.getSchemaForSymbol(
    "QueryAccountFundedListResponse"
  );
  // do not test pagination property
  delete schema.properties?.pagination;
  delete accountFundedListRes.pagination;
  const vResult = validate(schema, accountFundedListRes);
  expect(vResult.valid).toBeTruthy();
});

it("Query <accountStakedList>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const stakersListResponse = await lcdClient.kyve.stakersList({
    pool_id: pool.pools[0].id,
  });
  const accountStakedListRes = await lcdClient.kyve.accountStakedList({
    address: stakersListResponse.stakers[0].account,
  });
  const schema = typeQuerySchemas.getSchemaForSymbol(
    "QueryAccountStakedListResponse"
  );
  // do not test pagination property
  delete schema.properties?.pagination;
  delete accountStakedListRes.pagination;
  const vResult = validate(schema, accountStakedListRes);
  expect(vResult.valid).toBeTruthy();
});

it("Query <accountDelegationList>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const stakersListResponse = await lcdClient.kyve.stakersList({
    pool_id: pool.pools[0].id,
  });
  const accountDelegationListRes = await lcdClient.kyve.accountDelegationList({
    address: stakersListResponse.stakers[0].account,
  });
  const schema = typeQuerySchemas.getSchemaForSymbol(
    "QueryAccountDelegationListResponse"
  );
  // do not test pagination property
  delete schema.properties?.pagination;
  delete accountDelegationListRes.pagination;

  const vResult = validate(schema, accountDelegationListRes);
  expect(vResult.valid).toBeTruthy();
});
it("Query <delegatorsByPoolAndStaker>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const stakersListResponse = await lcdClient.kyve.stakersList({
    pool_id: pool.pools[0].id,
  });
  const delegatorsRes = await lcdClient.kyve.delegatorsByPoolAndStaker({
    pool_id: pool.pools[0].id,
    staker: stakersListResponse.stakers[0].staker,
  });
  const schema = typeQuerySchemas.getSchemaForSymbol(
    "QueryDelegatorsByPoolAndStakerResponse"
  );
  //do not test pagination property
  delete schema.properties?.pagination;
  delete delegatorsRes.pagination;
  const vResult = validate(schema, delegatorsRes);
  expect(vResult.valid).toBeTruthy();
});

it("Query <delegator>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const stakersListResponse = await lcdClient.kyve.stakersList({
    pool_id: pool.pools[0].id,
  });
  const delegatorsRes = await lcdClient.kyve.delegatorsByPoolAndStaker({
    pool_id: pool.pools[0].id,
    staker: stakersListResponse.stakers[0].staker,
  });
  const delegatorResponse = await lcdClient.kyve.delegator({
    pool_id: pool.pools[0].id,
    staker: stakersListResponse.stakers[0].staker,
    delegator: delegatorsRes.delegators[0].delegator,
  });
  const schema = typeQuerySchemas.getSchemaForSymbol("QueryDelegatorResponse");
  const vResult = validate(schema, delegatorResponse);
  expect(vResult.valid).toBeTruthy();
});

it("Query <stakersByPoolAndDelegator>", async () => {
  const pool = await lcdClient.kyve.pools({ pagination: { limit: "1" } });
  const stakersListResponse = await lcdClient.kyve.stakersList({
    pool_id: pool.pools[0].id,
  });
  const delegatorsRes = await lcdClient.kyve.delegatorsByPoolAndStaker({
    pool_id: pool.pools[0].id,
    staker: stakersListResponse.stakers[0].staker,
  });
  const stakersByPoolAndDelegatorRes =
    await lcdClient.kyve.stakersByPoolAndDelegator({
      pool_id: pool.pools[0].id,
      delegator: delegatorsRes.delegators[0].delegator,
    });
  const schema = typeQuerySchemas.getSchemaForSymbol(
    "QueryStakersByPoolAndDelegatorResponse"
  );
  //do not test pagination property
  delete schema.properties?.pagination;
  delete stakersByPoolAndDelegatorRes.pagination;
  const vResult = validate(schema, stakersByPoolAndDelegatorRes);
  expect(vResult.valid).toBeTruthy();
});
