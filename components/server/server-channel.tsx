"use client";

import { Channel, MemberRole, Server } from "@prisma/client";
import { useParams } from "next/navigation";
import { Edit, Lock, Trash } from "lucide-react";

import { cn } from "@/lib/utils";
import { channelIconMap } from "@/components/icon-maps";
import ActionTooltip from "@/components/action-tooltip";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const params = useParams();

  const Icon = channelIconMap[channel.type];

  return (
    <button
      onClick={() => {}}
      className={cn(
        "group p-2 rounded-md flex items-center gap-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 text-zinc-500 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      {Icon}
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm",
          params?.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-2">
          <ActionTooltip label={"Edit"}>
            <Edit className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
          </ActionTooltip>
          <ActionTooltip label={"Delete"}>
            <Trash className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto hidden group-hover:block w-4 h-4 text-zinc-500 dark:text-zinc-400 transition" />
      )}
    </button>
  );
};

export default ServerChannel;
