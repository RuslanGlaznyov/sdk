/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Any } from "cosmjs-types/google/protobuf/any";
import {
  VoteOption,
  WeightedVoteOption,
  voteOptionFromJSON,
  voteOptionToJSON,
} from "cosmjs-types/cosmos/gov/v1beta1/gov";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";

export const protobufPackage = "cosmos.gov.v1beta1";

/**
 * MsgSubmitProposal defines an sdk.Msg type that supports submitting arbitrary
 * proposal Content.
 */
export interface MsgSubmitProposal {
  content?: Any;
  initialDeposit: Coin[];
  proposer: string;
  isExpedited: boolean;
}

/** MsgSubmitProposalResponse defines the Msg/SubmitProposal response type. */
export interface MsgSubmitProposalResponse {
  proposalId: Long;
}

/** MsgVote defines a message to cast a vote. */
export interface MsgVote {
  proposalId: Long;
  voter: string;
  option: VoteOption;
}

/** MsgVoteResponse defines the Msg/Vote response type. */
export interface MsgVoteResponse {}

/**
 * MsgVoteWeighted defines a message to cast a vote.
 *
 * Since: cosmos-sdk 0.43
 */
export interface MsgVoteWeighted {
  proposalId: Long;
  voter: string;
  options: WeightedVoteOption[];
}

/**
 * MsgVoteWeightedResponse defines the Msg/VoteWeighted response type.
 *
 * Since: cosmos-sdk 0.43
 */
export interface MsgVoteWeightedResponse {}

/** MsgDeposit defines a message to submit a deposit to an existing proposal. */
export interface MsgDeposit {
  proposalId: Long;
  depositor: string;
  amount: Coin[];
}

/** MsgDepositResponse defines the Msg/Deposit response type. */
export interface MsgDepositResponse {}

function createBaseMsgSubmitProposal(): MsgSubmitProposal {
  return {
    content: undefined,
    initialDeposit: [],
    proposer: "",
    isExpedited: false,
  };
}

export const MsgSubmitProposal = {
  encode(
    message: MsgSubmitProposal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.content !== undefined) {
      Any.encode(message.content, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.initialDeposit) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.proposer !== "") {
      writer.uint32(26).string(message.proposer);
    }
    if (message.isExpedited) {
      writer.uint32(16).bool(message.isExpedited);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.content = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.initialDeposit.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.proposer = reader.string();
          break;
        case 4:
          message.isExpedited = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSubmitProposal {
    return {
      content: isSet(object.content) ? Any.fromJSON(object.content) : undefined,
      initialDeposit: Array.isArray(object?.initialDeposit)
        ? object.initialDeposit.map((e: any) => Coin.fromJSON(e))
        : [],
      proposer: isSet(object.proposer) ? String(object.proposer) : "",
      isExpedited: isSet(object.isExpedited)
        ? Boolean(object.isExpedited)
        : false,
    };
  },

  toJSON(message: MsgSubmitProposal): unknown {
    const obj: any = {};
    message.content !== undefined &&
      (obj.content = message.content ? Any.toJSON(message.content) : undefined);
    if (message.initialDeposit) {
      obj.initialDeposit = message.initialDeposit.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.initialDeposit = [];
    }
    message.proposer !== undefined && (obj.proposer = message.proposer);
    message.isExpedited !== undefined &&
      (obj.receiveEnabled = message.isExpedited);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubmitProposal>, I>>(
    object: I
  ): MsgSubmitProposal {
    const message = createBaseMsgSubmitProposal();
    message.content =
      object.content !== undefined && object.content !== null
        ? Any.fromPartial(object.content)
        : undefined;
    message.initialDeposit =
      object.initialDeposit?.map((e) => Coin.fromPartial(e)) || [];
    message.proposer = object.proposer ?? "";
    message.isExpedited = object.isExpedited ?? false;
    return message;
  },
};

function createBaseMsgSubmitProposalResponse(): MsgSubmitProposalResponse {
  return { proposalId: Long.UZERO };
}

export const MsgSubmitProposalResponse = {
  encode(
    message: MsgSubmitProposalResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.proposalId.isZero()) {
      writer.uint32(8).uint64(message.proposalId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSubmitProposalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitProposalResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSubmitProposalResponse {
    return {
      proposalId: isSet(object.proposalId)
        ? Long.fromString(object.proposalId)
        : Long.UZERO,
    };
  },

  toJSON(message: MsgSubmitProposalResponse): unknown {
    const obj: any = {};
    message.proposalId !== undefined &&
      (obj.proposalId = (message.proposalId || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubmitProposalResponse>, I>>(
    object: I
  ): MsgSubmitProposalResponse {
    const message = createBaseMsgSubmitProposalResponse();
    message.proposalId =
      object.proposalId !== undefined && object.proposalId !== null
        ? Long.fromValue(object.proposalId)
        : Long.UZERO;
    return message;
  },
};

function createBaseMsgVote(): MsgVote {
  return { proposalId: Long.UZERO, voter: "", option: 0 };
}

export const MsgVote = {
  encode(
    message: MsgVote,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.proposalId.isZero()) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.voter !== "") {
      writer.uint32(18).string(message.voter);
    }
    if (message.option !== 0) {
      writer.uint32(24).int32(message.option);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgVote {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64() as Long;
          break;
        case 2:
          message.voter = reader.string();
          break;
        case 3:
          message.option = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgVote {
    return {
      proposalId: isSet(object.proposalId)
        ? Long.fromString(object.proposalId)
        : Long.UZERO,
      voter: isSet(object.voter) ? String(object.voter) : "",
      option: isSet(object.option) ? voteOptionFromJSON(object.option) : 0,
    };
  },

  toJSON(message: MsgVote): unknown {
    const obj: any = {};
    message.proposalId !== undefined &&
      (obj.proposalId = (message.proposalId || Long.UZERO).toString());
    message.voter !== undefined && (obj.voter = message.voter);
    message.option !== undefined &&
      (obj.option = voteOptionToJSON(message.option));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgVote>, I>>(object: I): MsgVote {
    const message = createBaseMsgVote();
    message.proposalId =
      object.proposalId !== undefined && object.proposalId !== null
        ? Long.fromValue(object.proposalId)
        : Long.UZERO;
    message.voter = object.voter ?? "";
    message.option = object.option ?? 0;
    return message;
  },
};

function createBaseMsgVoteResponse(): MsgVoteResponse {
  return {};
}

export const MsgVoteResponse = {
  encode(
    _: MsgVoteResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgVoteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVoteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgVoteResponse {
    return {};
  },

  toJSON(_: MsgVoteResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgVoteResponse>, I>>(
    _: I
  ): MsgVoteResponse {
    const message = createBaseMsgVoteResponse();
    return message;
  },
};

function createBaseMsgVoteWeighted(): MsgVoteWeighted {
  return { proposalId: Long.UZERO, voter: "", options: [] };
}

export const MsgVoteWeighted = {
  encode(
    message: MsgVoteWeighted,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.proposalId.isZero()) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.voter !== "") {
      writer.uint32(18).string(message.voter);
    }
    for (const v of message.options) {
      WeightedVoteOption.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgVoteWeighted {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVoteWeighted();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64() as Long;
          break;
        case 2:
          message.voter = reader.string();
          break;
        case 3:
          message.options.push(
            WeightedVoteOption.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgVoteWeighted {
    return {
      proposalId: isSet(object.proposalId)
        ? Long.fromString(object.proposalId)
        : Long.UZERO,
      voter: isSet(object.voter) ? String(object.voter) : "",
      options: Array.isArray(object?.options)
        ? object.options.map((e: any) => WeightedVoteOption.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgVoteWeighted): unknown {
    const obj: any = {};
    message.proposalId !== undefined &&
      (obj.proposalId = (message.proposalId || Long.UZERO).toString());
    message.voter !== undefined && (obj.voter = message.voter);
    if (message.options) {
      obj.options = message.options.map((e) =>
        e ? WeightedVoteOption.toJSON(e) : undefined
      );
    } else {
      obj.options = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgVoteWeighted>, I>>(
    object: I
  ): MsgVoteWeighted {
    const message = createBaseMsgVoteWeighted();
    message.proposalId =
      object.proposalId !== undefined && object.proposalId !== null
        ? Long.fromValue(object.proposalId)
        : Long.UZERO;
    message.voter = object.voter ?? "";
    message.options =
      object.options?.map((e) => WeightedVoteOption.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgVoteWeightedResponse(): MsgVoteWeightedResponse {
  return {};
}

export const MsgVoteWeightedResponse = {
  encode(
    _: MsgVoteWeightedResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgVoteWeightedResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgVoteWeightedResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgVoteWeightedResponse {
    return {};
  },

  toJSON(_: MsgVoteWeightedResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgVoteWeightedResponse>, I>>(
    _: I
  ): MsgVoteWeightedResponse {
    const message = createBaseMsgVoteWeightedResponse();
    return message;
  },
};

function createBaseMsgDeposit(): MsgDeposit {
  return { proposalId: Long.UZERO, depositor: "", amount: [] };
}

export const MsgDeposit = {
  encode(
    message: MsgDeposit,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.proposalId.isZero()) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.depositor !== "") {
      writer.uint32(18).string(message.depositor);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeposit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeposit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposalId = reader.uint64() as Long;
          break;
        case 2:
          message.depositor = reader.string();
          break;
        case 3:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeposit {
    return {
      proposalId: isSet(object.proposalId)
        ? Long.fromString(object.proposalId)
        : Long.UZERO,
      depositor: isSet(object.depositor) ? String(object.depositor) : "",
      amount: Array.isArray(object?.amount)
        ? object.amount.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MsgDeposit): unknown {
    const obj: any = {};
    message.proposalId !== undefined &&
      (obj.proposalId = (message.proposalId || Long.UZERO).toString());
    message.depositor !== undefined && (obj.depositor = message.depositor);
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDeposit>, I>>(
    object: I
  ): MsgDeposit {
    const message = createBaseMsgDeposit();
    message.proposalId =
      object.proposalId !== undefined && object.proposalId !== null
        ? Long.fromValue(object.proposalId)
        : Long.UZERO;
    message.depositor = object.depositor ?? "";
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMsgDepositResponse(): MsgDepositResponse {
  return {};
}

export const MsgDepositResponse = {
  encode(
    _: MsgDepositResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDepositResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDepositResponse {
    return {};
  },

  toJSON(_: MsgDepositResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDepositResponse>, I>>(
    _: I
  ): MsgDepositResponse {
    const message = createBaseMsgDepositResponse();
    return message;
  },
};

/** Msg defines the bank Msg service. */
export interface Msg {
  /** SubmitProposal defines a method to create new proposal given a content. */
  SubmitProposal(
    request: MsgSubmitProposal
  ): Promise<MsgSubmitProposalResponse>;
  /** Vote defines a method to add a vote on a specific proposal. */
  Vote(request: MsgVote): Promise<MsgVoteResponse>;
  /**
   * VoteWeighted defines a method to add a weighted vote on a specific proposal.
   *
   * Since: cosmos-sdk 0.43
   */
  VoteWeighted(request: MsgVoteWeighted): Promise<MsgVoteWeightedResponse>;
  /** Deposit defines a method to add deposit on a specific proposal. */
  Deposit(request: MsgDeposit): Promise<MsgDepositResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.SubmitProposal = this.SubmitProposal.bind(this);
    this.Vote = this.Vote.bind(this);
    this.VoteWeighted = this.VoteWeighted.bind(this);
    this.Deposit = this.Deposit.bind(this);
  }
  SubmitProposal(
    request: MsgSubmitProposal
  ): Promise<MsgSubmitProposalResponse> {
    const data = MsgSubmitProposal.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.gov.v1beta1.Msg",
      "SubmitProposal",
      data
    );
    return promise.then((data) =>
      MsgSubmitProposalResponse.decode(new _m0.Reader(data))
    );
  }

  Vote(request: MsgVote): Promise<MsgVoteResponse> {
    const data = MsgVote.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1beta1.Msg", "Vote", data);
    return promise.then((data) => MsgVoteResponse.decode(new _m0.Reader(data)));
  }

  VoteWeighted(request: MsgVoteWeighted): Promise<MsgVoteWeightedResponse> {
    const data = MsgVoteWeighted.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.gov.v1beta1.Msg",
      "VoteWeighted",
      data
    );
    return promise.then((data) =>
      MsgVoteWeightedResponse.decode(new _m0.Reader(data))
    );
  }

  Deposit(request: MsgDeposit): Promise<MsgDepositResponse> {
    const data = MsgDeposit.encode(request).finish();
    const promise = this.rpc.request("cosmos.gov.v1beta1.Msg", "Deposit", data);
    return promise.then((data) =>
      MsgDepositResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
