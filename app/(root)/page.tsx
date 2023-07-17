"use client";

import { useEffect } from "react";
import { useStoreModal } from "@/hooks/useStoreModalHook";

export default function SetpPage() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [onOpen, isOpen]);

  return <div>Root page</div>;
}
