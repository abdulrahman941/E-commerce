import React from 'react'
import { Button } from "@/components/ui/button"
import AddBtn from '../../_components/addBtn/addBtn'
import ProductImg from '../../_components/productImg/productImg'


export default async function ProductDetails({params}: {params:{id: string}}) {
  let {id}=await params
  let response =await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  console.log(id)
  let {data:singleProduct} =await response.json()
  console.log(singleProduct)
  
  return <>
  <div className="container mx-auto flex-col md:flex-row flex my-10 w-[80%]">
    <div className="w-full md:w-1/4 mx-4">
    <div className="border-2 rounded-2xl">
      {/* <img src={data.imageCover} alt="" /> */}
      <ProductImg images={singleProduct.images}>
      </ProductImg>
    </div>
    </div>
    <div className="w-full md:w-3/4 xlmt-16 flex justify-center items-center gap-5">
    <h1 className='text-2xl font-semibold'>{singleProduct.category.name}</h1>
    <h3 className='my-3'>{singleProduct.description}</h3>
    <div className="flex justify-between w-full mb-5">
            <span>{singleProduct.price}EGP</span>
            <span><i className="fa-solid fa-star text-yellow-500"></i>{singleProduct.ratingsAverage}</span>
          </div>
          <AddBtn productId={singleProduct._id}/>
      {/* <Button className='w-full bg-green-500 cursor-pointer text-white hover:bg-green-600 hover:text-white' variant="outline">Add to cart</Button> */}

    </div>
  </div>
  
  </>
}
