  'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { log } from 'console'
import React from 'react'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import  Product  from '../../types/product';
import { deleteCartItem } from '../../services/cart/delete-cart-item'
import toast from 'react-hot-toast'
import { updateCartItem } from '../../services/cart/update-cart'
import { CartResponse } from '../../types/Cart-Response'
import { Button } from '@/components/ui/button'
import { ClearCart } from '@/services/cart/clear-cart'
import CartImg from "../../assets/Cart image.jpg"
import Image from 'next/image'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Cart() {
    const queryClient= useQueryClient()
   const{data:CartData,isLoading,isError}=useQuery<CartResponse>({
    queryKey:['get-cart'],
    queryFn:async()=>{
    const response=await fetch('/api/Cart')
    const payload=await response.json()
    return payload
    }
   })
   console.log('cart data',CartData)
   // delete cart
   const{mutate:delCartItem,isPending}=useMutation({
    mutationFn:deleteCartItem,
    onSuccess:()=>{
     toast.success('product deleted')
     queryClient.invalidateQueries({
      queryKey:['get-cart']
     })
    },onError:()=>{
     toast.error('Error')

    }
   })
    // Clear cart
   const{mutate:removeCart,data}=useMutation({
    mutationFn:ClearCart,
    onSuccess:()=>{
     toast.success('Cart deleted')
     queryClient.invalidateQueries({
      queryKey:['get-cart']
     })
    },onError:()=>{
     toast.error('Error')

    }
   })
   // update cart
   const{mutate:updateCart,isPending:updateLoading}=useMutation({
    mutationFn:updateCartItem,
    onSuccess:()=>{
     toast.success('product updated')
     queryClient.invalidateQueries({
      queryKey:['get-cart']
     })
    },onError:()=>{
     toast.error('Error')

    }
   })
   function handleUpdate(productId:string,count:number){
    updateCart({productId,count})
   }
   if(isLoading){
    return <Loading/>
   }
   if(isError){
    return  <Error/>
   }

   
   
  return <>
  {CartData?.numOfCartItems && CartData?.numOfCartItems > 0 ? (
  <div className="flex flex-col lg:flex-row gap-5 p-2 md:p-5">
    {/* Product List Section */}
    <div className="w-full lg:w-3/4">
      <div className="overflow-hidden bg-neutral-primary-soft shadow-xs rounded-base border border-default my-4">
        
        {/* Desktop View: Table (Visible on md and up) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium text-center">Qty</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {CartData?.data.products.map((product) => (
                <tr key={product._id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                  <td className="p-4">
                    <img src={product.product.imageCover} className="w-20 rounded-md" alt={product.product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-heading max-w-[200px] truncate">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center justify-center gap-3">
                        <button onClick={() => handleUpdate(product.product._id, product.count - 1)} className="h-8 w-8 flex items-center justify-center border rounded-full hover:bg-gray-100">-</button>
                        <span className="font-medium">{product.count}</span>
                        <button onClick={() => handleUpdate(product.product._id, product.count + 1)} className="h-8 w-8 flex items-center justify-center border rounded-full hover:bg-gray-100">+</button>
                     </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-heading">{product.price} EGP</td>
                  <td className="px-6 py-4 text-center">
                    <span onClick={() => delCartItem(product.product._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                         </svg>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Cards (Visible on small screens only) */}
        <div className="md:hidden divide-y divide-default">
          {CartData?.data.products.map((product) => (
            <div key={product._id} className="p-4 flex flex-col gap-4">
              <div className="flex gap-4">
                <img src={product.product.imageCover} className="w-24 h-24 object-cover rounded-md" alt="" />
                <div className="flex-1">
                  <h3 className="font-semibold text-heading line-clamp-2">{product.product.title}</h3>
                  <p className="text-green-600 font-bold mt-1">{product.price} EGP</p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-neutral-secondary-medium p-2 rounded-lg">
                <div className="flex items-center gap-4">
                   <button onClick={() => handleUpdate(product.product._id, product.count - 1)} className="bg-white h-8 w-8 rounded-full shadow flex items-center justify-center">-</button>
                   <span className="font-bold">{product.count}</span>
                   <button onClick={() => handleUpdate(product.product._id, product.count + 1)} className="bg-white h-8 w-8 rounded-full shadow flex items-center justify-center">+</button>
                </div>
                <button onClick={() => delCartItem(product.product._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                     </svg>

                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4">
           <Button onClick={() => removeCart()} className='bg-red-500 hover:bg-red-600 text-white w-full py-3 rounded-lg transition-all'>
              Clear All Cart
           </Button>
        </div>
      </div>
    </div>

    {/* Order Summary Section */}
    <div className="w-full lg:w-1/4">
      <div className="sticky top-5 border rounded-xl p-6 bg-white shadow-sm">
        <h2 className="text-lg font-bold border-b pb-4 mb-4 text-center">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items:</span>
          <span className="text-green-600 font-bold">{CartData?.numOfCartItems}</span>
        </div>
        <div className="flex justify-between mb-6">
          <span>Total:</span>
          <span className="text-green-600 font-bold">{CartData?.data.totalCartPrice} EGP</span>
        </div>
        <Button className='w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold'>
          <Link href={`/CheckOut/${CartData?.cartId}`} className="block w-full text-center">Proceed to Checkout</Link>
        </Button>
      </div>
    </div>
  </div>
) : (
  <div className="flex flex-col items-center justify-center p-10">
     <Image src={CartImg} alt='Cart Empty' height={300} width={300} />
     <h2 className="text-2xl mt-4 font-semibold text-gray-500">Your cart is empty</h2>
  </div>
)}
      


  
  </>
}




 {/* {CartData?.numOfCartItems && CartData?.numOfCartItems > 0?  <div className="flex gap-5">
    <div className="w-full lg:w-3/4">
     <div className="px-4 relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default my-4">
  <table className="w-full text-sm text-left rtl:text-right text-body">
    <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
      <tr>
        <th scope="col" className="px-16 py-3"> 
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Product
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Qty
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Price
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {CartData?.data.products.map((product)=>{return <tr key={product._id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <form className="max-w-xs mx-auto">
            <label htmlFor="counter-input-1" className="sr-only">Choose quantity:</label>
            <div className="relative flex items-center">
              <button onClick={()=>{handleUpdate(product.product._id,product.count-1)}} type="button" id="decrement-button-1" data-input-counter-decrement="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
              </button>
              <span id="counter-input-1" data-input-counter className="shrink-0 text-heading mx-3 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center">{product.count}</span>
              <button onClick={()=>{handleUpdate(product.product._id,product.count+1)}} type="button" id="increment-button-1" data-input-counter-increment="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
              </button>
            </div>
          </form>
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {product.price} EGP
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>{delCartItem(product.product._id)}} className="font-medium text-fg-danger hover:underline cursor-pointer">Remove</span>
        </td>
      </tr>})}
      
    </tbody>
  </table>
      <Button onClick={()=>{removeCart()}}className='my-4 bg-green-400 w-full hover:bg-green-600'>Clear Cart</Button>

</div>
    </div>
    <div className="w-full lg:w-1/4 mt-5">
    <div className="border py-4 px-10">
      <h2 className='text-xl mt-4'>Num of Cart Items:<span className='text-xl text-green-400'>{CartData?.numOfCartItems}</span></h2>
      <h2 className='text-xl'>Total Price:<span className='text-xl text-green-400'>{CartData?.data.totalCartPrice} EGP</span></h2>
      <div className="text-center">
              <Button className='mt-4 bg-green-400  hover:bg-green-600'><Link href={`/CheckOut/${CartData?.cartId}`}>Check Out</Link></Button>
      </div>
    </div>
    </div>
  </div>
  :<Image className='mx-auto' src={CartImg} alt='Cart' height={400} width={400}/>}
  */}
