import axios from "axios";

interface ServerNameAndImage {
  name: string,
  imageUrl: string
}

export const generateNewLink = async (serverId: string | undefined) => {
  const response = await axios.patch(`/api/servers/${serverId}/invite-code`);
  return response;
}

export const editServer = async (serverId: string | undefined, values: ServerNameAndImage) => {
  await axios.patch(`/api/servers/${serverId}`, values);
}

export const createServer = async (values: ServerNameAndImage) => {
  await axios.post("/api/servers", values);
}

export const leaveServer = async (serverId: string | undefined) => {
  await axios.patch(`/api/servers/${serverId}/leave`);
}

export const deleteServer = async (serverId: string | undefined) => {
  await axios.delete(`/api/servers/${serverId}`);
}
