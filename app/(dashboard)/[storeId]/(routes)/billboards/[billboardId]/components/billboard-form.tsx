"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import axios from "axios";
import { ArrowLeftCircle, Loader2, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

interface BillboardFormProps {
    initialData: Billboard | null;
}

const formSchema = z.object({
    label: z
        .string({
            required_error: "Name is required.",
        })
        .nonempty("Name can not be empty."),
    imageUrl: z
        .string({
            required_error: "Image URL is required.",
        })
        .nonempty("Image URL can not be empty."),
});

type BillboardFormValues = z.infer<typeof formSchema>;

export const BillboardForm: React.FC<BillboardFormProps> = ({
    initialData,
}) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const title = initialData ? "Edit billboard" : "Create billboard";
    const description = initialData ? "Edit a billboard" : "Add a billboard";
    const toastTitle = initialData ? "Billboard updated" : "Billboard created";
    const toastDescription = initialData
        ? "Billboard updated successfully."
        : "Billboard created successfully.";
    const toastErrorTitle = initialData
        ? "Can't update billboard"
        : "Can't create billboard";
    const toastErrorDescription = "Something went wrong.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<BillboardFormValues>({
        defaultValues: initialData || {
            label: "",
            imageUrl: "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: BillboardFormValues) => {
        try {
            setIsLoading(true);
            if (initialData) {
                await axios.patch(
                    `/api/${params.storeId}/billboards/${params.billboardId}`,
                    values
                );
            } else {
                await axios.post(`/api/${params.storeId}/billboards`, values);
            }
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
            toast({
                title: toastTitle,
                description: toastDescription,
            });
        } catch (error) {
            toast({
                title: toastErrorTitle,
                description: toastErrorDescription,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(
                `/api/${params.storeId}/billboards/${params.billboardId}`
            );
            router.refresh();
            router.push(`/${params.storeId}/billboards`);
            toast({
                title: toastTitle,
                description: toastDescription,
            });
        } catch (error) {
            toast({
                title: "Can't delete billboard",
                description: "Make sure you remove all categories.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
            setIsOpen(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href={`/${params.storeId}/billboards`}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeftCircle className="h-8 w-8" />
                        </Button>
                    </Link>
                    <Heading title={title} description={description} />
                </div>
                {initialData && (
                    <Button
                        variant="destructive"
                        onClick={() => setIsOpen(true)}
                        disabled={isLoading}
                    >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete Billboard
                    </Button>
                )}
            </div>

            <Separator />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Backgroud Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={isLoading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Billboard label"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="ml-auto"
                    >
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {action}
                    </Button>
                </form>
            </Form>

            <AlertModal
                isOpen={isOpen}
                isLoading={isLoading}
                onClose={() => setIsOpen(false)}
                onConfirm={onDelete}
            />
        </>
    );
};
