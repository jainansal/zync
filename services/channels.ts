import { ChannelType } from "@prisma/client";
import axios from "axios";

interface ChannelNameAndType {
  name: string,
  type: ChannelType
}

export const createChannel = async (serverId: string[] | string | undefined, values: ChannelNameAndType) => {
  await axios.post(`/api/channels?serverId=${serverId}`, values);
}

export const deleteChannel = async (serverId: string | undefined, channelId: string | undefined) => {
  await axios.delete(`/api/channels/${channelId}?serverId=${serverId}`);
}
