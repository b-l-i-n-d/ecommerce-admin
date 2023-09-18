"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useToast } from "@/components/ui/use-toast";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    name: z.string().nonempty("Store name cannot be empty"),
});

export const StoreModal = () => {
    const storeModal = useStoreModal();
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);
            const response = await axios.post("/api/stores", values);
            if (response.status === 201) {
                toast({
                    title: "Store created",
                    description: "Store has been created successfully.",
                });
                storeModal.onClose();
            }
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: error ? JSON.stringify(error) : "Unknown error",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories."
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder="E-commerce store"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button
                                variant="secondary"
                                disabled={isLoading}
                                onClick={storeModal.onClose}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Create store
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};
