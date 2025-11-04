import { CategoryType } from ".";
import { ChannelModel } from "./ChannelModel";

export class CategoryModel {
  id: number;
  server_id: string;
  name: string;
  channels: ChannelModel[];

  constructor(raw: CategoryType) {
    this.id = raw.id;
    this.server_id = raw.server_id;
    this.name = raw.name;
    this.channels = raw.channels.map((it) => new ChannelModel(it));
  }
}
