import axios from "axios";

export const generateNewLink = async (serverId: string | undefined) => {
  try {
    const response = await axios.patch(`/api/servers/${serverId}/invite-code`);
    return response;
  } catch (err) {
    throw err;
  }
}
