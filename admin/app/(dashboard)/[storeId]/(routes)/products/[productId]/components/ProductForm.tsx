"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Trash } from "lucide-react";
import { zodResolver } from '@hookform/resolvers/zod';

import Heading from "@/components/ui/heading";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import axios from 'axios';
import { AlertModal } from '@/components/modals/alert-modal';
import ImageUpload from '@/components/ui/image-upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Loading from '@/components/ui/loading';
import { Product, Size, subCategory } from '@/lib/types';


const formSchema = z.object({
  name:z.string().min(1),
  imageUrl:z.string().min(1),
  price:z.coerce.number().min(1),
  quantity:z.coerce.number().min(1),
  subCategoryId:z.string().min(1),
  sizeId:z.string().min(1),
  isFeatured:z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:Product & {
  } | null,
  categories:subCategory[],
  sizes:Size[]
}

const ProductForm:React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
}) => {
  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit product" : "Create product"; 
  const description = initialData ? "Edit a product" : "Add a  product"; 
  const toastMessage = initialData ? "Product updated" : "Product created";
  const action = initialData ? "Save Changes" : "Create"; 

  const defaultValues = initialData ? {
    ...initialData,
    price: parseFloat(String(initialData?.price)),
  } : {
      name:"",
      imageUrl:"",
      price:0,
      quantity:5,
      subCategoryId:'',
      sizeId:'',
      isFeatured:false,

  }

  const form = useForm<ProductFormValues>({
    resolver:zodResolver(formSchema),
    //@ts-ignore
    defaultValues
  });

  const [open,setOpen] = useState(false);
  const [loading,setLoading] = useState(false);


  const onSubmit = async(data:ProductFormValues) => {
    
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        console.log(data.subCategoryId);
        await axios.post(`/api/${params.storeId}/products`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success("Product deleted.");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }



  return (
    <>
      <AlertModal 
        isOpen={open}
        onClose={()=>setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
        {initialData && (
          <Button
          disabled={loading}
          variant='destructive'
          size='icon'
          onClick={()=>setOpen(true)}
          >
          <Trash className="h-4 w-4"/>
        </Button>
        )}
        
          
      </div>

      <Separator/>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
        <FormField
          control={form.control}
          name="imageUrl"
          render={({field})=>(
            <FormItem>
              <FormLabel>Background Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value ? [field.value]:[]}
                  disabled={loading}
                  onChange={(url)=>field.onChange(url)}
                  onRemove={(url)=>field.onChange("")}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}  
            /> 
            <div className='grid grid-cols-3 gap-8 '>
                <FormField
                control={form.control}
                name="name"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} placeholder='Product Name'/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}  
            /> 
                <FormField
                control={form.control}
                name="price"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type='number' disabled={loading} {...field} placeholder='9.99'/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}  
            /> 
                <FormField
                control={form.control}
                name="quantity"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type='number' disabled={loading} {...field} placeholder='5'/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}  
            /> 
             <FormField
                control={form.control}
                name="subCategoryId"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger >
                          <SelectValue 
                          defaultValue={field.value} placeholder='Select a Category'
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.subCategoryId} value={category.subCategoryId}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage/>
                  </FormItem>
                )}  
            /> 
             <FormField
                control={form.control}
                name="sizeId"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger >
                          <SelectValue 
                          defaultValue={field.value} placeholder='Select a Size'
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size.sizeId} value={size.sizeId}>
                            {size.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage/>
                  </FormItem>
                )}  
            /> 
            <FormField
                control={form.control}
                name="isFeatured"
                render={({field})=>(
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 '>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>This Product will appear on the HomePage</FormDescription>
                    </div>
                  </FormItem>
                )}  
            /> 
            </div>
            <Button disabled={loading} className='ml-auto' type='submit'>{action}</Button>
        </form>
      </Form>
      {loading && <Loading/>}
    </>
  )
}

export default ProductForm;