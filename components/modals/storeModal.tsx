"use client";

import { useStoreModal } from "@/hooks/useStoreModalHook";
import { Modal } from "@/components/ui/modal";

export const StoreModal = () => {
  const storemodal = useStoreModal();

  return (
    <Modal
      title="Create a new store"
      description="Add a new store to manage your products and categories"
      isOpen={storemodal.isOpen}
      onClose={storemodal.onClose}
    >
      Future Create Store Form
    </Modal>
  );
};
