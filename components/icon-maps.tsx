import { ChannelType, MemberRole } from "@prisma/client";
import { Crown, Hash, Mic, Shield, User, Video } from "lucide-react";

type RoleIconMap = {
  [key in MemberRole]: React.ReactNode;
};

type ChannelIconMap = {
  [key in ChannelType]: React.ReactNode;
};

export const roleIconMap: RoleIconMap = {
  GUEST: null,
  MODERATOR: <Shield className="w-4 h-4 text-indigo-500" />,
  ADMIN: <Crown className="w-4 h-4 text-yellow-700" />,
};

export const channelIconMap: ChannelIconMap = {
  TEXT: <Hash className="h-4 w-4" />,
  AUDIO: <Mic className="h-4 w-4" />,
  VIDEO: <Video className="h-4 w-4" />,
};
