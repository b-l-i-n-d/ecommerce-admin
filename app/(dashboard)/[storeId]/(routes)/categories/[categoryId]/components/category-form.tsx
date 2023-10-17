"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

interface CategoryFormProps {
    initialData: Category | null;
    billboards: Billboard[];
}

const formSchema = z.object({
    name: z
        .string({
            required_error: "Name is required.",
        })
        .nonempty("Name can not be empty."),
    billboardId: z
        .string({
            required_error: "Selct a billboard.",
        })
        .nonempty("Select a billboard."),
});

type CategroyFormValues = z.infer<typeof formSchema>;

export const CategoryForm: React.FC<CategoryFormProps> = ({
    initialData,
    billboards,
}) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const title = initialData ? "Edit category" : "Create category";
    const description = initialData ? "Edit a category" : "Add a category";
    const toastTitle = initialData ? "Category updated" : "Category created";
    const toastDescription = initialData
        ? "Category updated successfully."
        : "Category created successfully.";
    const toastErrorTitle = initialData
        ? "Can't update category"
        : "Can't create category";
    const toastErrorDescription = "Something went wrong.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<CategroyFormValues>({
        defaultValues: initialData || {
            name: "",
            billboardId: "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: CategroyFormValues) => {
        try {
            setIsLoading(true);
            if (initialData) {
                await axios.patch(
                    `/api/${params.storeId}/categories/${params.categoryId}`,
                    values
                );
            } else {
                await axios.post(`/api/${params.storeId}/categories`, values);
            }
            router.refresh();
            router.push(`/${params.storeId}/categories`);
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
                `/api/${params.storeId}/categories/${params.categoryId}`
            );
            router.refresh();
            router.push(`/${params.storeId}/categories`);
            toast({
                title: "Category deleted",
                description: "Category deleted successfully.",
            });
        } catch (error) {
            toast({
                title: "Can't delete category",
                description: "Make sure you remove all products.",
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
                    <Link href={`/${params.storeId}/categories`}>
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
                                            placeholder="Category name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Billboard</FormLabel>
                                    <Select
                                        defaultValue={field.value || undefined}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a billboard" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard) => (
                                                <SelectItem
                                                    key={billboard.id}
                                                    value={billboard.id}
                                                >
                                                    {billboard.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
