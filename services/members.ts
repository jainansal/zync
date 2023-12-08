import axios from "axios";
import { MemberRole } from "@prisma/client";

interface ServerIdAndRole {
  serverId: string,
  role: MemberRole
}

export const updateMemberRole = async (memberId: string | undefined, values: ServerIdAndRole) => {
  const response = await axios.patch(`/api/members/${memberId}/role`, values);
  return response
}

export const kickMember = async (memberId: string, values: {serverId: string}) => {
  const response = await axios.patch(`/api/members/${memberId}/kick`, values);
  return response;
}
