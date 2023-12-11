"use client";

import { Member, Profile, Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { roleIconMap } from "@/components/icon-maps";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  const visitMember = () => {
    router.push(`/servers/${server.id}/conversations/${member.id}`);
  };

  return (
    <button
      className={cn(
        "flex group p-2 w-full gap-2 rounded-md items-center hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
      onClick={visitMember}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-6 w-6 md:h-6 md:w-6"
      />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.memberId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </button>
  );
};

export default ServerMember;
