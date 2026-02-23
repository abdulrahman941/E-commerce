"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

// تعريف الأنواع لـ TypeScript لتجنب "الإيرور الأحمر"
interface Product {
  imageCover: string;
  title: string;
  category: { name: string };
}

interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

interface Order {
  id: number;
  _id: string;
  createdAt: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: CartItem[];
  shippingAddress: {
    city: string;
    phone: string;
    details: string;
  };
  user: {
    name: string;
    email: string;
  }
}

export default function OrderDetails() {
  const { id } = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  async function getOrderDetails() {
    const token = localStorage.getItem("userToken");
    try {
      setIsLoading(true)
      // في API RouteMisr، نأتي بكل الطلبات ونبحث عن الطلب المطلوب بالـ ID
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`, {
        headers: { token }
      })

      const foundOrder = data.data.find((item: Order) => item._id === id || item.id.toString() === id);

      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        toast.error("Order not found")
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to load details")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) getOrderDetails()
  }, [id])

  if (isLoading) return (
    <div className="min-h-screen flex justify-center items-center">
       <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (!order) return <div className="text-center py-20">Order Not Found</div>

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/allorders" className="text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-2">
            ← Back to All Orders
          </Link>
          <div className="text-right">
            <h1 className="text-2xl font-black text-gray-900">Order Details</h1>
            <p className="text-sm text-gray-500 font-mono">#{order.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1 & 2: Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <h2 className="font-bold text-gray-800">Order Summary ({order.cartItems.length} Items)</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {order.cartItems.map((item) => (
                  <div key={item._id} className="p-6 flex items-center gap-6">
                    <img 
                      src={item.product.imageCover} 
                      alt={item.product.title} 
                      className="w-24 h-24 object-cover rounded-xl shadow-sm border"
                    />
                    <div className="flex-grow">
                      <h3 className="font-bold text-gray-800 line-clamp-1">{item.product.title}</h3>
                      <p className="text-xs text-emerald-600 font-bold mt-1 uppercase">{item.product.category.name}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-gray-500 text-sm">Qty: <b className="text-gray-900">{item.count}</b></span>
                        <span className="font-black text-gray-900">{item.price} EGP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Shipping & Payment */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-widest">Order Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {order.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Delivery</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${order.isDelivered ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                    {order.isDelivered ? 'Delivered' : 'Processing'}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-widest">Shipping Details</h3>
              <div className="text-sm space-y-2">
                <p className="font-bold text-gray-800">{order.user.name}</p>
                <p className="text-gray-500">{order.user.email}</p>
                <p className="text-gray-500">{order.shippingAddress.phone}</p>
                <div className="mt-4 pt-4 border-t border-gray-50">
                   <p className="text-gray-400 text-xs mb-1">Address</p>
                   <p className="text-gray-700 leading-relaxed font-medium">
                    {order.shippingAddress.city}, {order.shippingAddress.details}
                   </p>
                </div>
              </div>
            </div>

            {/* Total Card */}
            <div className="bg-gray-900 p-6 rounded-2xl shadow-xl text-white">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-bold">{order.totalOrderPrice} EGP</span>
               </div>
               <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-emerald-400 font-bold uppercase text-xs">Free</span>
               </div>
               <div className="pt-4 border-t border-gray-800 flex justify-between items-end">
                  <span className="font-bold">Total</span>
                  <span className="text-3xl font-black text-emerald-500">{order.totalOrderPrice} <small className="text-xs">EGP</small></span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}