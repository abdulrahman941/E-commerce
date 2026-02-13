import React from 'react'
import { Button } from "@/components/ui/button"
import AddBtn from '../../_components/addBtn/addBtn'
import ProductImg from '../../_components/productImg/productImg'
import Link from 'next/link';


interface User {
  name: string;
  _id: string;
}

interface Review {
  _id: string;
  comment: string;
  ratings: number;
  user: User;
  createdAt: string;
}

export default async function ProductDetails({params}: {params:{id: string}}) {
  let {id}=await params
  let response =await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  console.log(id)
  let {data:singleProduct} =await response.json()
  console.log(singleProduct)

  // جلب المراجعات بناءً على الـ ID الخاص بالمنتج
let reviewsResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`);
let reviewsData = await reviewsResponse.json();
let reviews = reviewsData.data; // مصفوفة المراجعات


 
  return <>
 <div className="w-full min-h-screen bg-white">
  {/* 1. قسم تفاصيل المنتج */}
  <div className="container mx-auto px-4 py-10">
    <div className="flex flex-col md:flex-row gap-10 items-center md:items-start w-[90%] md:w-[85%] mx-auto">
      <div className="w-full md:w-1/4">
        <div className="border rounded-2xl overflow-hidden shadow-sm">
          <ProductImg images={singleProduct.images} />
        </div>
      </div>
      <div className="w-full md:w-3/4 flex flex-col gap-5 text-center md:text-left">
        <h1 className="text-3xl font-bold text-gray-800">{singleProduct.category.name}</h1>
        <p className="text-gray-600 leading-relaxed text-lg">{singleProduct.description}</p>
        <div className="flex justify-between items-center w-full py-4 border-b border-gray-100">
          <span className="text-2xl font-bold text-green-600">{singleProduct.price} EGP</span>
          <span className="flex items-center gap-1 font-bold text-lg text-yellow-500">
            <i className="fa-solid fa-star"></i> {singleProduct.ratingsAverage}
          </span>
        </div>
        <div className="w-full mt-4">
          <AddBtn productId={singleProduct._id} />
        </div>
      </div>
    </div>
  </div>

 <Link href={`/products/${singleProduct._id}/reviews`}>
  {/* 2. قسم المراجعات - الحل الجذري للسنترة */}
  <div className="w-full mt-10 border-t bg-gray-50 py-16">
    <div className="container mx-auto px-4">
      
      {/* العنوان المسنتر */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Customers Reviews</h2>
        <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full"></div>
      </div>

      {reviews && reviews.length > 0 ? (
        /* هنا السر: flex مع justify-center يضمن السنترة سواء كان 1 أو 2 أو أكثر */
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl mx-auto">
          {reviews.map((rev:Review) => (
            <div 
              key={rev._id} 
              className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(45%)] p-8 border border-gray-100 rounded-3xl shadow-sm bg-white hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center font-bold text-xl">
                    {rev.user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-gray-800 text-lg">{rev.user.name}</span>
                </div>
                <div className="text-amber-500 font-bold bg-amber-50 px-3 py-1 rounded-full text-sm">
                  {rev.ratings} ⭐
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed italic bg-gray-50 p-5 rounded-2xl border-l-4 border-amber-400 text-left">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 w-full max-w-2xl px-10 shadow-sm">
            <i className="fa-regular fa-comments text-5xl text-gray-200 mb-4 block"></i>
            <p className="text-gray-400 text-xl font-medium uppercase tracking-widest italic">No Reviews Yet</p>
          </div>
        </div>
      )}
    </div>
  </div>
 </Link>
</div>
  
  </>
}

