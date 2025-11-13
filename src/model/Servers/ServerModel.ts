import { RawChannelType, ServerMemberType, ServerType } from ".";
import { CategoryModel } from "./CategoryModel";
import { ChannelModel, ChannelType } from "./ChannelModel";

export class ServerModel {
  id: string;
  name: string;
  displayPicture?: string;
  lastSelectedChannel: string;
  channels: ChannelModel[];
  categories: CategoryModel[];
  members: ServerMemberType[];

  constructor(raw: ServerType) {
    this.id = raw.id;
    this.name = raw.name;
    this.displayPicture = raw.displayPicture;
    this.lastSelectedChannel = raw.lastSelectedChannel;
    this.channels = raw.channels.map((it) => new ChannelModel(it));
    this.categories = raw.categories.map((it) => new CategoryModel(it));
    this.members = raw.members;
  }

  public getFirstChannelInServer() {
    let foundChannel = undefined;
    if (this.channels.length) {
      foundChannel = this.channels.find(
        (channel) => channel.type === ChannelType.text
      );
    }
    if (!foundChannel && this.categories.length) {
      const categoryWithValidChannel = this.categories.find(
        (category) =>
          category.channels.find(
            (channel) => channel.type === ChannelType.text
          ) !== undefined
      );
      foundChannel = categoryWithValidChannel?.channels.find(
        (channel) => channel.type === ChannelType.text
      );
    }

    return foundChannel;
  }

  public findChannelInServer(channelId: string): ChannelModel | undefined {
    const channel = this.channels.find((c) => c.id === channelId);
    if (channel) return channel;
    for (const category of this.categories) {
      const ch = category.channels.find((c) => c.id === channelId);
      if (ch) return ch;
    }
    return undefined;
  }

  public updateChannelInfo(channelInfo: RawChannelType): void {
    this.channels = this.channels.map((it) => {
      if (it.id === channelInfo.id) {
        const updatedChannel = new ChannelModel(channelInfo);
        updatedChannel.setHasBeenFetched(true);
        return updatedChannel;
      }
      return it;
    });

    this.categories = this.categories.map((category) => {
      if (category.channels.find((channel) => channel.id === channelInfo.id)) {
        category.channels = category.channels.map((it) => {
          if (it.id === channelInfo.id) {
            const updatedChannel = new ChannelModel(channelInfo);
            updatedChannel.setHasBeenFetched(true);
            return updatedChannel;
          }
          return it;
        });
      }
      return category;
    });

    this.lastSelectedChannel = channelInfo.id;
  }

  public deleteChannel(channelId: string): void {
    this.channels = this.channels.filter((it) => it.id !== channelId);

    this.categories = this.categories.map((category) => {
      category.channels = category.channels.filter((it) => it.id !== channelId);
      return category;
    });
  }

  public addChannel(channelInfo: RawChannelType): void {
    if (channelInfo.categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === channelInfo.categoryId) {
          category.channels.push(new ChannelModel(channelInfo));
        }
        return category;
      });
    } else {
      this.channels.push(new ChannelModel(channelInfo));
    }
  }
}
