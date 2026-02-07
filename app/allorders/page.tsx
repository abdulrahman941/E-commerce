"use client"
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link' // تصحيح الاستيراد هنا

interface OrderItem {
  _id: string; // أو id حسب بياناتك
  createdAt: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isDelivered: boolean;
  isPaid: boolean;
  cartItems?: any[]; // أضف تفاصيل الكارت هنا لاحقاً
}

export default function AllOrders() {
  const [isLoading, setisLoading] = useState(false)
  const [orders, setOrders] = useState<OrderItem[]>([]) // تغيير الاسم للجمع وتغيير النوع لمصفوفة

  async function getAllOrders() {
    setisLoading(true)
    try {
      // ملحوظة: تأكد من أن الـ URL صحيح، عادة طلبات المستخدم تحتاج Header Token
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/orders/")
      
      // التحقق من البيانات (RouteMisr API يرجع مصفوفة مباشرة في الغالب)
      if (data) {
        setOrders(data.data || data); // حسب شكل الـ Response
        toast.success("Fetched successfully")
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong")
    } finally {
      setisLoading(false)
    }
  }

  useEffect(() => {
    getAllOrders()
  }, [])

  if (isLoading) return <div className="text-center my-5">Loading...</div>

  return <>
 
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-800">Order History</h1>
          <p className="text-gray-500 mt-2">Manage and track your recent purchases</p>
        </header>

        {orders?.length > 0 ? (
          <div className="space-y-6">
            {orders.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                
                {/* Order Header */}
                <div className="bg-gray-50/50 px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-100 px-3 py-1 rounded-lg text-emerald-700 font-bold text-sm">
                      Order #{item._id}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-semibold">Date</p>
                      <p className="text-sm font-medium text-gray-700">
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                     {item.isPaid ? 
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Paid</span> : 
                      <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">Pending Payment</span>
                    }
                    {item.isDelivered ? 
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Delivered</span> : 
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">In Transit</span>
                    }
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Products Section */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                      📦 Items <span className="text-gray-400 text-sm">({item.cartItems?.length})</span>
                    </h3>
                    <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                      {item.cartItems?.map((el, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-100 transition-colors">
                          <img
                            src={el.product.imageCover}
                            alt={el.product.title}
                            className="w-16 h-16 rounded-md object-cover shadow-sm bg-gray-100"
                          />
                          <div className="flex-grow">
                            <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{el.product.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">Qty: <span className="font-bold text-emerald-600">{el.count}</span></p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-700">{el.price} EGP</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="bg-gray-50 p-5 rounded-xl flex flex-col justify-between border border-gray-100">
                    <div className="space-y-3">
                      <h3 className="font-bold text-gray-800 mb-4">Payment Summary</h3>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Method</span>
                        <span className="font-medium text-gray-700 uppercase">{item.paymentMethodType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-medium text-gray-700">{item.totalOrderPrice} EGP</span>
                      </div>
                      <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                        <span className="font-bold text-gray-800">Total</span>
                        <span className="text-xl font-black text-emerald-600">{item.totalOrderPrice} EGP</span>
                      </div>
                    </div>

                    <Link
                      href={`/order-details/${item._id}`}
                      className="mt-6 block w-full text-center bg-gray-800 hover:bg-black text-white font-bold py-3 rounded-lg transition-colors duration-200 shadow-sm"
                    >
                      View Details
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4 text-gray-300">🛒</div>
            <h2 className="text-xl font-bold text-gray-800">No orders found</h2>
            <p className="text-gray-500 mt-2">Looks like you haven't placed any orders yet.</p>
            <Link href="/" className="mt-6 inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2 rounded-full font-bold transition-colors">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  </>
}