"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

interface ColorFormProps {
    initialData: Color | null;
}

const formSchema = z.object({
    name: z
        .string({
            required_error: "Name is required.",
        })
        .nonempty("Name can not be empty."),
    value: z
        .string({
            required_error: "Value is required.",
        })
        .nonempty("Value can not be empty.")
        .regex(/^#([0-9a-f]{3}){1,2}$/i, "Value must be a valid hex color."),
});

type ColorFormValues = z.infer<typeof formSchema>;

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const title = initialData ? "Edit color" : "Create color";
    const description = initialData ? "Edit a color" : "Add a color";
    const toastTitle = initialData ? "Color updated" : "Color created";
    const toastDescription = initialData
        ? "Color updated successfully."
        : "Color created successfully.";
    const toastErrorTitle = initialData
        ? "Can't update color"
        : "Can't create color";
    const toastErrorDescription = "Something went wrong.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<ColorFormValues>({
        defaultValues: initialData || {
            name: "",
            value: "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: ColorFormValues) => {
        try {
            setIsLoading(true);
            if (initialData) {
                await axios.patch(
                    `/api/${params.storeId}/colors/${params.colorId}`,
                    values
                );
            } else {
                await axios.post(`/api/${params.storeId}/colors`, values);
            }
            router.refresh();
            router.push(`/${params.storeId}/colors`);
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
                `/api/${params.storeId}/colors/${params.colorId}`
            );
            router.refresh();
            router.push(`/${params.storeId}/colors`);
            toast({
                title: "Color deleted",
                description: "Color deleted successfully.",
            });
        } catch (error) {
            toast({
                title: "Can't delete color",
                description:
                    "Make sure you remove all products using this color.",
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
                    <Link href={`/${params.storeId}/colors`}>
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
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="Color name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input
                                                disabled={isLoading}
                                                placeholder="Color value"
                                                {...field}
                                            />
                                            <div
                                                className="p-4 rounded-full border"
                                                style={{
                                                    backgroundColor:
                                                        field.value,
                                                }}
                                            />
                                        </div>
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
