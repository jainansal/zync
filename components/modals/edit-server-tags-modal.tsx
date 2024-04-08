"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithTags } from "@/types";
import ServerTags from "../server/server-tags";
import { useToast } from "../ui/use-toast";

const EditServerTagsModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onOpen, isOpen, type, onClose, data } = useModal();
  const router = useRouter();
  const { toast } = useToast();

  const isModalOpen = isOpen && type === "editServerTags";
  const { server } = data as { server: ServerWithTags };

  const searchTags = debounce(async (tag: string) => {
    if (!tag) {
      return [];
    }
    const response = await axios.get(`/api/tags?name=${tag}`);
    const tags = response.data.tags;
    if (tags.length) {
      return tags;
    }
    return [{ value: tag, label: tag }];
  }, 1000);

  const handleSubmitTag = async (selectedTag: unknown) => {
    try {
      setIsLoading(true);
      const tag = selectedTag as { value: string; label: string };
      const response = await axios.post(
        `/api/tags?serverId=${server.id}&name=${tag.value}`
      );
      router.refresh();
      onOpen("editServerTags", { server: response.data.server });
      toast({
        description: "Tags successfully updated.",
      });
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSubmitNewTag = async () => {
  //   try {
  //     if (newTag) {
  //       setIsLoading(true);
  //       const response = await addNewTag(newTag, {
  //         serverId: server.id,
  //       });
  //       router.refresh();
  //       onOpen("editServerTags", { server: response.data });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleKick = async (memberId: string) => {
  //   try {
  //     setLoadingId(memberId);

  //     const response = await kickMember(memberId, { serverId: server.id });

  //     router.refresh();
  //     onOpen("members", { server: response.data });
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setLoadingId("");
  //   }
  // };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Edit Tags
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Tags give a vibe to your server. <br /> Be creative with them.
          </DialogDescription>
        </DialogHeader>
        <AsyncSelect
          cacheOptions
          loadOptions={searchTags}
          defaultOptions
          isDisabled={isLoading}
          onChange={handleSubmitTag}
        />
        <ServerTags tags={server?.tags} className="bg-zinc-300" />
      </DialogContent>
    </Dialog>
  );
};

export default EditServerTagsModal;
