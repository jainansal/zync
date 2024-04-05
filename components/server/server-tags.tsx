import { Pencil } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { MemberRole, Tag } from "@prisma/client";

interface ServerTagsProps {
  role: MemberRole | undefined;
  tags: { tag: Tag }[];
}

const ServerTags = ({ role, tags }: ServerTagsProps) => {
  const myTags = [
    {
      name: "pro",
    },
    {
      name: "glo",
    },
    {
      name: "glo",
    },
  ];
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between py-2">
        <p className="uppercase text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          Tags
        </p>
        {role !== MemberRole.GUEST && (
          <ActionTooltip label={"Edit tags"} side="top">
            <button className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
              <Pencil className="h-4 w-4" />
            </button>
          </ActionTooltip>
        )}
      </div>
      <div className="max-h-[100px] w-100 flex gap-2 overflow-y-auto flex-wrap bg-zinc-800 rounded-md p-2">
        {tags?.length ? (
          <>
            {tags?.map((tag) => (
              <div className="rounded-xl py-1 px-2 text-sm">{tag.tag.name}</div>
            ))}
          </>
        ) : (
          <div className="text-muted-foreground text-sm m-auto">
            No tags yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerTags;
