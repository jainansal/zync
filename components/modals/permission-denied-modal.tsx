"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";

const PermissionDeniedModal = () => {
  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "permissionDenied";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="py-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Moderators only
          </DialogTitle>
          <DialogDescription>
            Only moderators have access to this channel
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionDeniedModal;
