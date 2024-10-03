"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title: string;
  paragraph: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  paragraph,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const close = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onClose();
  };
  const confirm = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onConfirm();
  };

  return (
    <Modal
      title={title}
      description={paragraph}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={close}>
          Odustani
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Nastavi
        </Button>
      </div>
    </Modal>
  );
};
