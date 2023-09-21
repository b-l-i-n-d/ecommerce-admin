"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Loader2, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import AlertModal from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
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
import { useOrigin } from "@/hooks/use-origin";

interface SettingFormProps {
    initialData: Store;
}

const formSchema = z.object({
    name: z
        .string({
            required_error: "Name is required.",
        })
        .nonempty("Name can not be empty."),
});

type SettingFormValues = z.infer<typeof formSchema>;

export const SettingForm: React.FC<SettingFormProps> = ({ initialData }) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const origin = useOrigin();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<SettingFormValues>({
        defaultValues: initialData,
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: SettingFormValues) => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, values);
            router.refresh();
            toast({
                title: "Success",
                description: "Store updated successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");
            toast({
                title: "Success",
                description: "Store deleted successfully.",
            });
        } catch (error) {
            toast({
                title: "Can't delete store",
                description: "Make sure you don't have any products.",
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
                <Heading
                    title="Settings"
                    description="Manage your store settings."
                />
                <Button
                    variant="destructive"
                    onClick={() => setIsOpen(true)}
                    disabled={isLoading}
                >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete Store
                </Button>
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
                                            placeholder="Store name"
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
                        Save changes
                    </Button>
                </form>
            </Form>

            <Separator className="my-4" />

            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                description={`${origin}/api/stores/${params.storeId}`}
                variant="public"
            />

            <AlertModal
                isOpen={isOpen}
                isLoading={isLoading}
                onClose={() => setIsOpen(false)}
                onConfirm={onDelete}
            />
        </>
    );
};
