"use client";

import { Channel, MemberRole, Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { Edit, Lock, Trash } from "lucide-react";

import { cn } from "@/lib/utils";
import { channelIconMap } from "@/components/icon-maps";
import ActionTooltip from "@/components/action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import ModBadge from "../mod-badge";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const params = useParams();
  const channelLocked = channel.permissions === "MODERATOR" && role === "GUEST";

  const Icon = channelLocked ? (
    <Lock className="h-4 w-4" />
  ) : (
    channelIconMap[channel.type]
  );

  const visitChannel = () => {
    if (!channelLocked) {
      router.push(`/servers/${server.id}/channels/${channel.id}`);
    } else {
      onOpen("permissionDenied");
    }
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { server, channel });
  };

  return (
    <button
      onClick={visitChannel}
      className={cn(
        "group p-2 rounded-md flex items-center gap-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 text-zinc-500 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      {Icon}
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm flex gap-2 items-center",
          params?.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
        {channel.permissions === "MODERATOR" && <ModBadge />}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-2">
          <ActionTooltip label={"Edit"}>
            <Edit
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
              onClick={(e) => onAction(e, "editChannel")}
            />
          </ActionTooltip>
          <ActionTooltip label={"Delete"}>
            <Trash
              className="hidden group-hover:block w-4 h-4 text-rose-500 hover:text-rose-600 dark:text-rose-500 dark:hover:text-rose-400 transition"
              onClick={(e) => onAction(e, "deleteChannel")}
            />
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
