export interface ServerList {
  id: string;
  name: string;
  displayPicture?: string;
  lastSelectedChannel?: string;
}

export interface ServerType extends ServerList {
  channels: ChannelType[];
  categories: CategoryType[];
}

export interface ChannelType {
  id: string;
  categoryId: number;
  name: string;
  topic: string;
  type: number;
  messages: ChannelMessageType[];
  currentMessage?: string;
}

export interface CategoryType {
  id: number;
  server_id: string;
  name: string;
  channels: ChannelType[];
}

export interface ChannelMessageType {
  id: string;
  channelId: string;
  author: { userId: string; displayName: string };
  content: string;
  timeStamp: Date;
  refMessageId: string;
}
