"use client";

import { Modal } from "@/components/ui/modal";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
}) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        setIsMounted(true);
    }
    return (
        <Modal
            title="Are you sure?"
            description="This action cann't be undone."
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 flex items-center justify-end w-full gap-2">
                <Button
                    disabled={isLoading}
                    onClick={onClose}
                    variant="secondary"
                >
                    Cancel
                </Button>
                <Button
                    disabled={isLoading}
                    onClick={onConfirm}
                    variant="destructive"
                >
                    {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Confirm
                </Button>
            </div>
        </Modal>
    );
};

export default AlertModal;
