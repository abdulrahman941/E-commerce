// Reviews.tsx
"use client"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from '@/schema/reviews'
import { CreateReviews } from '@/services/Reviews/Create Review For Product (nested)';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { GetAllReviews } from '@/services/Reviews/getAllReviews';
import { AxiosError } from 'axios';
import  DropDownReview  from '../../../_components/DropDownReview/DropDownReview';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';

// أضف هذا خارج المكون تماماً (Top of the file)
interface Review {
    _id: string;
    review: string;
    rating: number;
    user?: {
        name: string;
    };
}

// تأكد من تمرير productId هنا عند استدعاء المكون في صفحة المنتج
export default function Reviews() {
    const { data: session } = useSession();
    const currentUser = session?.user;
    const queryClient = useQueryClient()
    const params=useParams()
    const productId=params.id as string
    const form = useForm({
        defaultValues: {
            review: '',
            rating: 5
        },
        resolver: zodResolver(schema),
        mode: 'onBlur'
    })

   const { mutate, isPending } = useMutation({
    mutationFn: (values: { review: string, rating: number }) => {
        return CreateReviews(productId, values);
    }, 
    onSuccess: () => {
        toast.success('Review Added Successfully');
        form.reset();
        queryClient.invalidateQueries({ queryKey: ['get-review'] });
    },
    onError: (err: AxiosError<{message:string}>) => {
        // محاولة جلب رسالة الخطأ الحقيقية من السيرفر
        const serverMessage = err.response?.data?.message || "You might have already reviewed this product";
        toast.error(serverMessage);
    }
})

    function onSubmit(Values: {review:string,rating:number}) {
        mutate({
            review: Values.review,
            rating: Values.rating // التحقق من كونه Number حسب الديكومنتيشن
        });
    }

   // جلب البيانات
    const { data: reviews, isLoading } = useQuery({
        queryKey: ['get-review'],
        queryFn: GetAllReviews
    })
    return <>
        <div className="container mx-auto my-12 w-full lg:w-[60%] bg-gray-100 rounded-md py-5 px-4 shadow-sm">
            <h1 className='text-green-600 text-3xl text-center mb-6 font-bold'>Product Reviews</h1>
            
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-center items-center">
                    <FieldSet className="w-full max-w-md">
                        <FieldGroup className="space-y-4">
                            <Field>
                                <FieldLabel className="font-semibold">Your Review</FieldLabel>
                                <Input {...form.register('review')} placeholder="How was the product?" />
                                {form.formState.errors.review && (
                                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.review.message as string}</p>
                                )}
                            </Field>

                            <Field>
                                <FieldLabel className="font-semibold">Rating (1-5)</FieldLabel>
                                <Input {...form.register('rating')} type="number" min="1" max="5" />
                                {form.formState.errors.rating && (
                                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.rating.message as string}</p>
                                )}
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </div>

                <div className="flex justify-center mt-8">
                    <Button 
                        disabled={isPending || !productId} 
                        type="submit" 
                        className="bg-green-500 text-white px-8 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
                    >
                        {isPending ? "Sending..." : "Submit Review"}
                    </Button>
                </div>
            </form>
        </div>
        <div className="container mx-auto my-12 w-full lg:w-[60%]">
            {/* ... كود الفورم السابق ... */}

            <hr className="my-10" />

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Customers Feedback</h2>
                
                {isLoading ? (
                    <p className="text-center text-gray-500">Loading reviews...</p>
                ) : (
                    <div className="space-y-4">
                        {reviews?.map((item: Review) => (
                            <div key={item._id} className="border-b pb-4 last:border-0">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-green-700">{item.user?.name || 'User'}</span>
                                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm">
                                        ⭐ {item.rating}
                                    </span>
                                    {item.user?.name === currentUser?.name &&  <DropDownReview reviewId={item._id}/>}
                                   
                                </div>
                                <p className="text-gray-600 italic">"{item.review}"</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </>
}