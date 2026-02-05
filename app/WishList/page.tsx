'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import Loading from '../Loading/Loading'
import product  from '../../types/product'; // 1. تصحيح اسم النوع ليبدأ بحرف كبير
import toast from 'react-hot-toast'
import Link from 'next/link'
import { DeleteWishListItem } from '@/services/cart/delete-WishList-item'
import { addTocart } from '@/services/cart/add-prod-cart'
import Image from 'next/image' // 2. استخدام مكون Image لتحسين الأداء
import { wishlist } from './../../types/WishList';

export default function WishList() {
    const queryClient = useQueryClient()

    // جلب بيانات الويشليست
    const { data: WishListData, isLoading } = useQuery<wishlist>({
        queryKey: ['get-WishList'],
        queryFn: async () => {
            const response = await fetch('/api/WishList')
            if (!response.ok) throw new Error('Failed to fetch wishlist')
            return await response.json()
        }
    })

    // 1. Mutation حذف منتج
    const { mutate: removeFromWishlist } = useMutation({
        mutationFn: (id: string) => DeleteWishListItem(id), // 3. تمرير المعرف بشكل صحيح
        onSuccess: () => {
            toast.success('Product removed from wishlist')
            queryClient.invalidateQueries({ queryKey: ['get-WishList'] })
        },
        onError: () => {
            toast.error('Error deleting product')
        }
    })

    // 2. Mutation إضافة للسلة
    const { mutate: addToCartMutation, isPending: isAdding } = useMutation({
        mutationFn: (id: string) => addTocart(id),
        onSuccess: (data) => {
            toast.success(data?.message || 'Product added to cart');
            queryClient.invalidateQueries({ queryKey: ['get-cart'] });
        },
        onError: () => toast.error('Failed to add to cart')
    })

    if (isLoading) return <Loading />

    // استخراج العناصر لسهولة الاستخدام وتجنب التكرار
    const wishlistItems = WishListData?.data || [];

    return (
        <section className="py-8 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                {WishListData?.count && WishListData.count > 0 ? (
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                                </svg>
                                My Wishlist 
                                <span className="text-sm font-normal text-gray-500 bg-white border px-2 py-1 rounded-full">
                                    {WishListData.count} Items
                                </span>
                            </h1>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-left rtl:text-right border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                                            <th className="px-6 py-4 font-semibold">Product</th>
                                            <th className="px-6 py-4 font-semibold text-center">Price</th>
                                            <th className="px-4 py-4 font-semibold text-center">Availability</th>
                                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {wishlistItems.map((item: product) => (
                                            <tr key={item._id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border">
                                                            <img 
                                                                src={item.imageCover} 
                                                                alt={item.title} 
                                                                className="h-full w-full object-cover" 
                                                            />
                                                        </div>
                                                        <div className="max-w-[200px] lg:max-w-[300px]">
                                                            <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">{item.title}</h3>
                                                            <p className="text-xs text-gray-400 mt-1">ID: {item._id.slice(-6)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-center">
                                                    <span className="text-lg font-bold text-green-600 whitespace-nowrap">
                                                        {item.price} <small className="text-[10px] uppercase">EGP</small>
                                                    </span>
                                                </td>
                                                <td className="px-4 py-5 text-center">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">In Stock</span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <button 
                                                            onClick={() => addToCartMutation(item._id)}
                                                            disabled={isAdding}
                                                            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 
                                                            ${isAdding ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
                                                        >
                                                            {isAdding ? 'Adding...' : 'Add to Cart'}
                                                        </button>
                                                        <button 
                                                            onClick={() => removeFromWishlist(item._id)} 
                                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="md:hidden divide-y divide-gray-100">
                                {wishlistItems.map((item: product) => (
                                    <div key={item._id} className="p-4 flex flex-col gap-4">
                                        <div className="flex gap-4">
                                            <img src={item.imageCover} className="w-24 h-24 object-cover rounded-xl shadow-sm border" alt={item.title} />
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-800 text-sm line-clamp-2">{item.title}</h3>
                                                <p className="text-green-600 font-extrabold mt-1 text-lg">{item.price} EGP</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => addToCartMutation(item._id)}
                                                disabled={isAdding}
                                                className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all 
                                                ${isAdding ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 text-white'}`}>
                                                {isAdding ? 'Adding...' : 'Add to Cart'}
                                            </button>
                                            <button 
                                                onClick={() => removeFromWishlist(item._id)} 
                                                className="px-4 border border-red-100 text-red-500 rounded-xl active:bg-red-50"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Your wishlist is empty</h2>
                        <Link href="/Products" className="mt-8 bg-black text-white px-10 py-3 rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg">
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}