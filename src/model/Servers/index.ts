export interface ServerType {
  id: string;
  name: string;
  displayPicture?: string;
  lastSelectedChannel: string;
  channels: ChannelType[];
  categories: CategoryType[];
  members: ServerMemberType[];
}

export interface ServerMemberType {
  userId: string;
  displayName: string;
  nickname: string;
  // profilePicture: string, // to be implemented
  // status: string; // eventually should become 'online' | 'offline' | 'dnd'
}

export interface ChannelType {
  id: string;
  categoryId?: number;
  name: string;
  topic: string;
  type: 0 | 1;
  messages: ChannelMessageType[];
  currentMessage: string;
}

export interface CategoryType {
  id: number;
  server_id: string;
  name: string;
  channels: ChannelType[];
}

export interface ChannelMessageType {
  id?: number;
  channelId: string;
  author: { userId: string; displayName: string };
  content: string;
  timeStamp: Date;
  refMessageId?: string;
}
