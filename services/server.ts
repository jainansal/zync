import axios from "axios";

interface ServerNameAndImage {
  name: string,
  imageUrl: string
}

export const generateNewLink = async (serverId: string | undefined) => {
  try {
    const response = await axios.patch(`/api/servers/${serverId}/invite-code`);
    return response;
  } catch (err) {
    throw err;
  }
}

export const editServer = async (serverId: string | undefined, values: ServerNameAndImage) => {
  await axios.patch(`/api/servers/${serverId}`, values);
}

export const createServer = async (values: ServerNameAndImage) => {
  await axios.post("/api/servers", values);
}
