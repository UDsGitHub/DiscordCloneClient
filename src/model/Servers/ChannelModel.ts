import { ChannelMessageType, RawChannelType } from ".";

export enum ChannelType {
  text,
  voice
}

export class ChannelModel {
  id: string;
  categoryId?: number;
  name: string;
  topic: string;
  type: 0 | 1;
  messages: ChannelMessageType[];
  currentMessage: string;
  private fetched: boolean = false;

  constructor(raw: RawChannelType) {
    this.id = raw.id;
    this.categoryId = raw.categoryId;
    this.name = raw.name;
    this.topic = raw.topic;
    this.type = raw.type;
    this.messages = raw.messages;
    this.currentMessage = raw.currentMessage;
  }

  public hasBeenFetched(): boolean {
    return this.fetched;
  }

  public setHasBeenFetched(value: boolean): void {
    this.fetched = value;
  }
}
