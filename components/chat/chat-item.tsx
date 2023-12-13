"use client";

import { Member, Profile } from "@prisma/client";

import UserAvatar from "@/components/user-avatar";
import ActionTooltip from "@/components/action-tooltip";
import { roleIconMap } from "@/components/icon-maps";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: Boolean;
  currentMember: Member;
  isUpdated: Boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <UserAvatar
            src={member.profile.imageUrl}
            className="h-6 w-6 md:h-6 md:w-6"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p className="font-semibold text-xs cursor-pointer hover:underline">
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {content}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
