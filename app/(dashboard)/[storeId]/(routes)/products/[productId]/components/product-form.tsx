"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    Category,
    Color,
    Image,
    Product,
    Size,
    SizeStock,
} from "@prisma/client";
import axios from "axios";
import { ArrowLeftCircle, Loader2, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { ImageUpload } from "@/components/ui/image-upload";
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

interface ProductFormProps {
    initialData:
        | (Product & {
              images: Image[];
              sizes: SizeStock[];
          })
        | null;
    categories: Category[];
    sizes: Size[];
    colors: Color[];
}

const formSchema = z.object({
    name: z
        .string({
            required_error: "Name is required.",
        })
        .nonempty("Name can not be empty."),
    images: z
        .object({
            url: z.string(),
        })
        .array(),
    price: z.coerce
        .number({
            required_error: "Price is required.",
        })
        .min(0, "Price can not be negative."),
    categoryId: z
        .string({
            required_error: "Category Id is required.",
        })
        .nonempty("Category can not be empty."),
    sizes: z
        .object({
            sizeId: z
                .string({
                    required_error: "Size is required.",
                })
                .nonempty("Size can not be empty."),
            stock: z.coerce
                .number({
                    required_error: "Stock is required.",
                })
                .min(1, "Stock can not be less than 1."),
        })
        .array(),
    colorId: z
        .string({
            required_error: "Color Id is required.",
        })
        .nonempty("Color can not be empty."),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    categories,
    sizes,
    colors,
}) => {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const title = initialData ? "Edit product" : "Create product";
    const description = initialData ? "Edit a product" : "Add a product";
    const toastTitle = initialData ? "Product updated" : "Product created";
    const toastDescription = initialData
        ? "Product updated successfully."
        : "Product created successfully.";
    const toastErrorTitle = initialData
        ? "Can't update product"
        : "Can't create product";
    const toastErrorDescription = "Something went wrong.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<ProductFormValues>({
        defaultValues: initialData
            ? {
                  ...initialData,
                  price: parseFloat(String(initialData.price)),
              }
            : {
                  name: "",
                  images: [],
                  price: 0,
                  categoryId: "",
                  sizes: [
                      {
                          sizeId: "",
                          stock: 1,
                      },
                  ],
                  colorId: "",
                  isFeatured: false,
                  isArchived: false,
              },
        resolver: zodResolver(formSchema),
        mode: "onChange",
    });

    const formFieldArray = useFieldArray({
        control: form.control,
        name: "sizes",
        rules: {
            required: "Sizes is required.",
            validate: (sizes: ProductFormValues["sizes"]) => {
                if (sizes.length === 0) {
                    return "Sizes can not be empty.";
                }
                if (sizes.some((size) => size.sizeId === "")) {
                    return "Sizes can not be empty.";
                }
                if (sizes.some((size) => size.stock < 1)) {
                    return "Stock can not be less than 1.";
                }
                return true;
            },
        },
    });

    const onSubmit = async (values: ProductFormValues) => {
        try {
            setIsLoading(true);

            const isDuplicateSizes = values.sizes.some(
                (size) =>
                    values.sizes.filter((s) => s.sizeId === size.sizeId)
                        .length > 1
            );

            if (isDuplicateSizes) {
                toast({
                    title: "Size duplicated",
                    description: "Sizes can not be duplicated.",
                    variant: "destructive",
                });
                setIsLoading(false);
                return;
            }

            console.log(values);

            if (initialData) {
                await axios.patch(
                    `/api/${params.storeId}/products/${params.productId}`,
                    values
                );
            } else {
                await axios.post(`/api/${params.storeId}/products`, values);
            }
            router.refresh();
            router.push(`/${params.storeId}/products`);
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
                `/api/${params.storeId}/products/${params.productId}`
            );
            router.refresh();
            router.push(`/${params.storeId}/products`);
            toast({
                title: "Product deleted",
                description: "Product deleted successfully.",
            });
        } catch (error) {
            toast({
                title: "Can't delete product",
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
                    <Link href={`/${params.storeId}/products`}>
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
                        Delete Product
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
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Images</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value.map(
                                            (image) => image.url
                                        )}
                                        disabled={isLoading}
                                        onChange={(url) =>
                                            field.onChange([
                                                ...field.value,
                                                { url },
                                            ])
                                        }
                                        onRemove={(url) =>
                                            field.onChange(
                                                [...field.value].filter(
                                                    (image) => image.url !== url
                                                )
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                            placeholder="Product name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={isLoading}
                                            placeholder="Product price"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        defaultValue={field.value || undefined}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="colorId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <Select
                                        defaultValue={field.value || undefined}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a color" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {colors.map((color) => (
                                                <SelectItem
                                                    key={color.id}
                                                    value={color.id}
                                                >
                                                    <div className="inline-flex items-center gap-2">
                                                        <div
                                                            className="p-3 rounded-full border"
                                                            style={{
                                                                backgroundColor:
                                                                    color.value,
                                                            }}
                                                        />
                                                        {color.name}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Featured</FormLabel>
                                        <FormDescription>
                                            This product will be appear in home
                                            page.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Archived</FormLabel>
                                        <FormDescription>
                                            This product will not appear
                                            anywhere in the store.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="p-4 rounded-md bg-muted space-y-4">
                        {formFieldArray.fields.map((field, index) => (
                            <div
                                className="grid grid-cols-3 gap-8"
                                key={field.id}
                            >
                                <div className="cols-span-1">
                                    <FormField
                                        control={form.control}
                                        name={`sizes.${index}.sizeId`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Size</FormLabel>
                                                <Select
                                                    defaultValue={
                                                        field.value || undefined
                                                    }
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a size" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {sizes
                                                            // filter sizes that are already selected but not the current one
                                                            .filter(
                                                                (size) =>
                                                                    !formFieldArray.fields
                                                                        .map(
                                                                            (
                                                                                field
                                                                            ) =>
                                                                                field.sizeId
                                                                        )
                                                                        .includes(
                                                                            size.id
                                                                        ) ||
                                                                    formFieldArray
                                                                        .fields[
                                                                        index
                                                                    ].sizeId ===
                                                                        size.id
                                                            )
                                                            .map((size) => (
                                                                <SelectItem
                                                                    key={
                                                                        size.id
                                                                    }
                                                                    value={
                                                                        size.id
                                                                    }
                                                                >
                                                                    {size.name}
                                                                </SelectItem>
                                                            ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <FormField
                                        control={form.control}
                                        name={`sizes.${index}.stock`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Stock</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        disabled={isLoading}
                                                        placeholder="Product stock"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {formFieldArray.fields.length > 1 && (
                                    <div className="flex items-end justify-start">
                                        <Button
                                            size={"icon"}
                                            variant={"destructive"}
                                            onClick={() =>
                                                formFieldArray.remove(index)
                                            }
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                        <Button
                            onClick={() =>
                                formFieldArray.append({ sizeId: "", stock: 1 })
                            }
                        >
                            <Plus className="h-4 w-4 mr-2" /> Add size
                        </Button>
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
