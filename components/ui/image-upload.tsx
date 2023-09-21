"use client";

import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value,
}) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div
                        key={url}
                        className="relative h-[200px] w-[200px] rounded-md overflow-hidden"
                    >
                        <div className="z-10 absolute top-2 right-2">
                            <Button size="icon" variant="destructive">
                                <Trash
                                    className="h-4 w-4"
                                    onClick={() => onRemove(url)}
                                />
                            </Button>
                        </div>
                        <Image
                            fill
                            src={url}
                            className="object-cover"
                            alt="Image"
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset="havgdxfx">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };

                    return (
                        <Button
                            onClick={onClick}
                            disabled={disabled}
                            variant="secondary"
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            Upload Image
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
};
