import axios from "axios";
import { MemberRole } from "@prisma/client";

interface MemberIdAndRole {
  memberId: string,
  role: MemberRole
}

export const updateMemberRole = async (serverId: string | undefined, values: MemberIdAndRole) => {
  await axios.patch(`/api/servers/${serverId}/update-role`, values);
}
