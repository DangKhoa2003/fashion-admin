'use client';
import { useForm } from 'react-hook-form';
import { Category, Image, Product, Size, Color } from '@prisma/client';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';

import {
      Select,
      SelectValue,
      SelectTrigger,
      SelectItem,
      SelectContent,
} from '@/components/ui/select';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
      Form,
      FormControl,
      FormDescription,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { AlertModal } from '@/components/modals/alert-modal';
import ImageUpload from '@/components/ui/image-upload';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
      name: z.string().min(1),
      images: z.object({ url: z.string() }).array(),
      price: z.coerce.number(),
      categoryId: z.string().min(1),
      inStock: z.coerce.number(),
      colorId: z.string().min(1),
      sizeId: z.string().min(1),
      isFeatured: z.boolean().default(false).optional(),
      isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
      initialData:
            | (Product & {
                    images: Image[];
              })
            | null;
      categories: Category[];
      colors: Color[];
      sizes: Size[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
      initialData,
      categories,
      sizes,
      colors,
}) => {
      const params = useParams();
      const router = useRouter();

      const [open, setOpen] = useState(false);
      const [loading, setLoading] = useState(false);

      const title = initialData ? 'Edit Product' : 'Create Product';
      const description = initialData ? 'Edit a product' : 'Add a new product';
      const toastMessage = initialData
            ? 'Product Updated.'
            : 'Product Created.';
      const action = initialData ? 'Save changes' : 'Create';

      const form = useForm<ProductFormValues>({
            resolver: zodResolver(formSchema),
            defaultValues: initialData
                  ? {
                          ...initialData,
                          price: parseFloat(String(initialData?.price)),
                    }
                  : {
                          name: '',
                          images: [],
                          price: 99.9,
                          categoryId: '',
                          inStock: 99,
                          colorId: '',
                          sizeId: '',
                          isFeatured: false,
                          isArchived: false,
                    },
      });

      const onSubmit = async (data: ProductFormValues) => {
            try {
                  setLoading(true);
                  if (initialData) {
                        await axios.patch(
                              `/api/${params.storeId}/products/${params.productId}`,
                              data,
                        );
                  } else {
                        await axios.post(
                              `/api/${params.storeId}/products`,
                              data,
                        );
                  }
                  router.refresh();
                  router.push(`/${params.storeId}/products`);
                  toast.success(toastMessage);
            } catch (error) {
                  toast.error('Somethings went wrong.');
            } finally {
                  setLoading(false);
            }
      };

      const onDelete = async () => {
            try {
                  setLoading(true);
                  await axios.delete(
                        `/api/${params.storeId}/products/${params.productId}`,
                  );
                  router.refresh();
                  router.push(`/${params.storeId}/products`);
                  toast.success('Product deleted.');
            } catch (error) {
                  toast.error('Something went wrong.');
            } finally {
                  setLoading(false);
                  setOpen(false);
            }
      };

      return (
            <>
                  <AlertModal
                        isOpen={open}
                        onClose={() => setOpen(false)}
                        onConfirm={onDelete}
                        loading={loading}
                  />
                  <div className="flex items-center justify-between">
                        <Heading title={title} description={description} />
                        {initialData && (
                              <Button
                                    disabled={loading}
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => {
                                          setOpen(true);
                                    }}
                              >
                                    <Trash className="h-4 w-4" />
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
                                    name="images"
                                    control={form.control}
                                    render={({ field }) => (
                                          <FormItem>
                                                <FormLabel>Images</FormLabel>
                                                <FormControl>
                                                      <ImageUpload
                                                            disabled={loading}
                                                            value={field.value.map(
                                                                  (image) =>
                                                                        image.url,
                                                            )}
                                                            onChange={(url) =>
                                                                  field.onChange(
                                                                        [
                                                                              ...field.value,
                                                                              {
                                                                                    url,
                                                                              },
                                                                        ],
                                                                  )
                                                            }
                                                            onRemove={(url) =>
                                                                  field.onChange(
                                                                        [
                                                                              ...field.value.filter(
                                                                                    (
                                                                                          current,
                                                                                    ) =>
                                                                                          current.url !==
                                                                                          url,
                                                                              ),
                                                                        ],
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
                                          name="name"
                                          control={form.control}
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>
                                                            Name
                                                      </FormLabel>
                                                      <FormControl>
                                                            <Input
                                                                  disabled={
                                                                        loading
                                                                  }
                                                                  placeholder="Product name"
                                                                  {...field}
                                                            />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />

                                    <FormField
                                          name="price"
                                          control={form.control}
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>
                                                            Price
                                                      </FormLabel>
                                                      <FormControl>
                                                            <Input
                                                                  disabled={
                                                                        loading
                                                                  }
                                                                  placeholder="9.99"
                                                                  {...field}
                                                            />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />

                                    <FormField
                                          name="categoryId"
                                          control={form.control}
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>
                                                            Category
                                                      </FormLabel>
                                                      <Select
                                                            disabled={loading}
                                                            onValueChange={
                                                                  field.onChange
                                                            }
                                                            value={field.value}
                                                            defaultValue={
                                                                  field.value
                                                            }
                                                      >
                                                            <FormControl>
                                                                  <SelectTrigger>
                                                                        <SelectValue
                                                                              defaultValue={
                                                                                    field.value
                                                                              }
                                                                              placeholder="Select a category"
                                                                        />
                                                                  </SelectTrigger>
                                                            </FormControl>

                                                            <SelectContent>
                                                                  {categories.map(
                                                                        (
                                                                              category,
                                                                        ) => (
                                                                              <SelectItem
                                                                                    value={
                                                                                          category.id
                                                                                    }
                                                                                    key={
                                                                                          category.id
                                                                                    }
                                                                              >
                                                                                    {
                                                                                          category.name
                                                                                    }
                                                                              </SelectItem>
                                                                        ),
                                                                  )}
                                                            </SelectContent>
                                                      </Select>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />

                                    <FormField
                                          name="inStock"
                                          control={form.control}
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>
                                                            In Stock
                                                      </FormLabel>
                                                      <FormControl>
                                                            <Input
                                                                  disabled={
                                                                        loading
                                                                  }
                                                                  placeholder="99"
                                                                  {...field}
                                                            />
                                                      </FormControl>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />

                                    <FormField
                                          name="sizeId"
                                          control={form.control}
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>
                                                            Size
                                                      </FormLabel>
                                                      <Select
                                                            disabled={loading}
                                                            onValueChange={
                                                                  field.onChange
                                                            }
                                                            value={field.value}
                                                            defaultValue={
                                                                  field.value
                                                            }
                                                      >
                                                            <FormControl>
                                                                  <SelectTrigger>
                                                                        <SelectValue
                                                                              defaultValue={
                                                                                    field.value
                                                                              }
                                                                              placeholder="Select a size"
                                                                        />
                                                                  </SelectTrigger>
                                                            </FormControl>

                                                            <SelectContent>
                                                                  {sizes.map(
                                                                        (
                                                                              size,
                                                                        ) => (
                                                                              <SelectItem
                                                                                    value={
                                                                                          size.id
                                                                                    }
                                                                                    key={
                                                                                          size.id
                                                                                    }
                                                                              >
                                                                                    {
                                                                                          size.name
                                                                                    }
                                                                              </SelectItem>
                                                                        ),
                                                                  )}
                                                            </SelectContent>
                                                      </Select>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />

                                    <FormField
                                          name="colorId"
                                          control={form.control}
                                          render={({ field }) => (
                                                <FormItem>
                                                      <FormLabel>
                                                            Color
                                                      </FormLabel>
                                                      <Select
                                                            disabled={loading}
                                                            onValueChange={
                                                                  field.onChange
                                                            }
                                                            value={field.value}
                                                            defaultValue={
                                                                  field.value
                                                            }
                                                      >
                                                            <FormControl>
                                                                  <SelectTrigger>
                                                                        <SelectValue
                                                                              defaultValue={
                                                                                    field.value
                                                                              }
                                                                              placeholder="Select a color"
                                                                        />
                                                                  </SelectTrigger>
                                                            </FormControl>

                                                            <SelectContent>
                                                                  {colors.map(
                                                                        (
                                                                              color,
                                                                        ) => (
                                                                              <SelectItem
                                                                                    value={
                                                                                          color.id
                                                                                    }
                                                                                    key={
                                                                                          color.id
                                                                                    }
                                                                              >
                                                                                    {
                                                                                          color.name
                                                                                    }
                                                                              </SelectItem>
                                                                        ),
                                                                  )}
                                                            </SelectContent>
                                                      </Select>
                                                      <FormMessage />
                                                </FormItem>
                                          )}
                                    />

                                    <FormField
                                          name="isFeatured"
                                          control={form.control}
                                          render={({ field }) => (
                                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 bg-backgroundExtra rounded-md border p-4">
                                                      <FormControl>
                                                            <Checkbox
                                                                  checked={
                                                                        field.value
                                                                  }
                                                                  //@ts-ignore
                                                                  onCheckedChange={
                                                                        field.onChange
                                                                  }
                                                            />
                                                      </FormControl>

                                                      <div className="space-y-1 leading-none">
                                                            <FormLabel>
                                                                  Featured
                                                            </FormLabel>
                                                            <FormDescription>
                                                                  This product
                                                                  will appear on
                                                                  the home page.
                                                            </FormDescription>
                                                      </div>
                                                </FormItem>
                                          )}
                                    />

                                    <FormField
                                          name="isArchived"
                                          control={form.control}
                                          render={({ field }) => (
                                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 bg-backgroundExtra rounded-md border p-4">
                                                      <FormControl>
                                                            <Checkbox
                                                                  checked={
                                                                        field.value
                                                                  }
                                                                  //@ts-ignore
                                                                  onCheckedChange={
                                                                        field.onChange
                                                                  }
                                                            />
                                                      </FormControl>

                                                      <div className="space-y-1 leading-none">
                                                            <FormLabel>
                                                                  Archived
                                                            </FormLabel>
                                                            <FormDescription>
                                                                  This product
                                                                  will not
                                                                  appear any
                                                                  where in the
                                                                  store.
                                                            </FormDescription>
                                                      </div>
                                                </FormItem>
                                          )}
                                    />
                              </div>

                              <Button
                                    disabled={loading}
                                    className="ml-auto"
                                    type="submit"
                              >
                                    {action}
                              </Button>
                        </form>
                  </Form>
            </>
      );
};
