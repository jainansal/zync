import { Tag } from "@prisma/client";
import ServerTag from "./server-tag";
import { cn } from "@/lib/utils";

interface ServerTagsProps {
  tags: { tag: Tag }[];
  className?: string;
}

const ServerTags = ({ tags, className }: ServerTagsProps) => {
  return (
    <div
      className={cn(
        "max-h-[100px] w-100 flex gap-2 overflow-y-auto flex-wrap bg-zinc-800 rounded-md p-2",
        className
      )}
    >
      {tags?.length ? (
        <>
          {tags?.map((tag) => (
            <ServerTag name={tag.tag.name} color={tag.tag.color} />
          ))}
        </>
      ) : (
        <div className="text-muted-foreground text-sm m-auto">No tags yet</div>
      )}
    </div>
  );
};

export default ServerTags;
