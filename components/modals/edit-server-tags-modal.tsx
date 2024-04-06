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

const EditServerTagsModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState("");
  const { onOpen, isOpen, type, onClose, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "editServerTags";
  const { server } = data as { server: ServerWithTags };

  const searchTags = debounce(async (tag: string) => {
    if (!tag) {
      return Promise.resolve({ data: [] });
    }
    const response = await axios.get(`/api/tags?name=${tag}`);
    const tags = response.data.tags;
    return tags;
  }, 1000);

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
        <AsyncSelect cacheOptions loadOptions={searchTags} defaultOptions />
        <ServerTags tags={server?.tags} className="bg-zinc-300" />
      </DialogContent>
    </Dialog>
  );
};

export default EditServerTagsModal;
