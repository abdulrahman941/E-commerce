"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// تعريف هيكل البيانات (Interface)
interface OrderItem {
  count: number;
  price: number;
  product: {
    imageCover: string;
    title: string;
  };
}

interface Order {
  _id: string;
  id: number;
  createdAt: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: OrderItem[];
}

export default function UserOrders() {
  // ملاحظة: يمكنك جلب الـ ID من الرابط أو من بيانات المستخدم المسجل
  const { userId } = useParams(); 
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getOrders() {
    try {
      setIsLoading(true);
      // استخدام الرابط الخاص بطلبات المستخدم المعين
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`|| "693b10d82037f0d2903afe3c");
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load your orders");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getOrders();
  }, [userId]);

  if (isLoading) return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Purchase History</h1>
          <p className="text-gray-500 mt-2">Manage and track your recent orders</p>
        </header>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                
                {/* الجزء العلوي: معلومات الطلب الأساسية */}
                <div className="p-6 md:flex items-center justify-between bg-gray-50/50 border-b border-gray-100 gap-4">
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <p className="text-gray-400 font-bold uppercase text-[10px]">Order ID</p>
                      <p className="font-bold text-gray-900">#{order.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-bold uppercase text-[10px]">Placed On</p>
                      <p className="font-bold text-gray-700">{new Date(order.createdAt).toLocaleDateString('en-US')}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-bold uppercase text-[10px]">Total Amount</p>
                      <p className="font-black text-emerald-600">{order.totalOrderPrice} EGP</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {order.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${order.isDelivered ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                      {order.isDelivered ? 'Delivered' : 'In Transit'}
                    </span>
                  </div>
                </div>

                {/* الجزء الأوسط: عرض مصغر للمنتجات */}
                <div className="p-6">
                  <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {order.cartItems.map((item, idx) => (
                      <div key={idx} className="flex-shrink-0 group relative">
                        <img 
                          src={item.product.imageCover} 
                          alt={item.product.title} 
                          className="w-16 h-16 rounded-lg object-cover border border-gray-100"
                        />
                        <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Link 
                      href={`/order-details/${order._id}`}
                      className="inline-flex items-center justify-center px-6 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-colors"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
             <p className="text-gray-400 font-medium">No orders found for this user.</p>
          </div>
        )}
      </div>
    </div>
  )
}