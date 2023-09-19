"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { Loader2, Trash } from "lucide-react";
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
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

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

const SettingForm: React.FC<SettingFormProps> = ({ initialData }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<SettingFormValues>({
        defaultValues: initialData,
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: SettingFormValues) => {
        setIsLoading(true);

        try {
            // await createStore(values);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
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
                    size="icon"
                    variant="destructive"
                    onClick={() => setIsOpen(true)}
                    disabled={isLoading}
                >
                    <Trash className="h-4 w-4" />
                </Button>
            </div>

            <Separator className="my-4" />

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
                        {isLoading && <Loader2 className="mr-2 h-4 w-4" />}
                        Save changes
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default SettingForm;
