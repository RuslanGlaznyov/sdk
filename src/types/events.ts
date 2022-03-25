/**
 *  Contains all events form the custom messages in the go/cosmos KYVE implementation.
 */

export class MessageEvent {
  sender?: string;
  action?: string;
  module?: string;
  time?: Date;
  height?: number;
  args: any;

  private readonly eventsArray: any[];

  constructor(eventsArray: any[], time: Date, height: number) {
    this.eventsArray = eventsArray;

    let eventName = eventsArray.find(
      (value) => value.key == "EventName"
    )?.value;

    this.action =
      eventName ??
      eventsArray.reverse().find((value) => value.key == "action")?.value;
    this.module =
      eventsArray.reverse().find((value) => value.key == "module")?.value ?? "";
    this.sender =
      eventsArray.reverse().find((value) => value.key == "sender")?.value ?? "";
    this.time = time;
    this.height = height;

    this.args = {};

    for (const pair of eventsArray) {
      this.args[pair.key[0].toLowerCase() + pair.key.slice(1)] = pair.value;
    }

    if (this.action == "Voted") {
      this.sender = this.args.creator ?? "";
    }
  }
}
