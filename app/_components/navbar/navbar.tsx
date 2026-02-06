"use client"
import { Badge } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { DropdownMenuBasic } from '../dropDown/dropDown'
import { useQuery } from '@tanstack/react-query'
import { CartResponse } from '../../../types/Cart-Response'
import {wishlist} from '../../../types/WishList'
export default function Navbar() {
  const{data:CartData,isLoading,isError}=useQuery({
      queryKey:['get-cart'],
      queryFn:async()=>{
      const response=await fetch('/api/Cart')
      const payload=await response.json()
      return payload
      }
     })
     const{data:WishListData,isLoading:isPending,isError:Error}=useQuery({
      queryKey:['get-WishList'],
      queryFn:async()=>{
      const response=await fetch('/api/WishList')
      const payload=await response.json()
      return payload
      }
     })
   const [IsOpen, setIsOpen] = useState(false)
   const pathname=usePathname()
   function toggleNav(){
    setIsOpen(!IsOpen)
   }
const path=[
    {href:'/', content:'home'},
    {href:'/products', content:'products'},
    {href:'/brands', content:'brands'},
    {href:'/categories', content:'categories'}
]


const authpath=[
    {href:'/auth/login', content:'login'},
    {href:'/auth/register', content:'register'}
    
]
const {status,data:session} = useSession()
console.log(status)
 function closeComponent(){
  setIsOpen(false)
}
 function LogOut(){
  signOut({
    callbackUrl:'/auth/login'
  })
}
  return<>
  <nav className="bg-green-500 w-full fixed top-0 z-50">
  <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap md:gap-16 items-center justify-between mx-auto">
    <Link href={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>

      <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">freshCart</span>
    </Link>
    <button onClick={toggleNav} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" /></svg>
    </button>
    <div className={`${!IsOpen && 'hidden'} w-full md:flex justify-between`} id="navbar-default">
      <ul className="font-medium flex justify-center items-center flex-col p-4 md:p-0 mt-4 rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
        {path.map((elem)=>{return <li key={elem.content}>
          <Link onClick={closeComponent}href={elem.href} className={`block py-2 px-3 ${pathname === elem.href ? 'active' : 'text-white'}`}>{elem.content}</Link>
        </li>})}
        
      </ul>
      <ul className="font-medium flex items-center flex-col md:p-0 rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
        {status=="authenticated"?<>
        <li className="py-7">Hi,{session?.user?.name}</li>
        <li className='flex items-center gap-6'>
  {/* Cart Icon Container */}
  <div className="relative group">
    <Link onClick={closeComponent} href={'/cart'} className="text-white hover:text-gray-200 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
      {CartData?.numOfCartItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-green-500">
          {CartData?.numOfCartItems}
        </span>
      )}
    </Link>
  </div>

  {/* Wishlist Icon Container */}
  <div className="relative group">
    <Link onClick={closeComponent} href={'/WishList'} className="text-white hover:text-gray-200 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
      {WishListData?.count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-green-500">
          {WishListData?.count}
        </span>
      )}
    </Link>
  </div>
</li>
       
        
        {/* <li onClick={LogOut} className="cursor-pointer">LogOut</li> */}
        <DropdownMenuBasic LogOut={LogOut} closeComponent={closeComponent}/>


        </>:authpath.map((elem)=>{return <li key={elem.content}>
          <Link onClick={closeComponent}href={elem.href} className={`block py-2 px-3 ${pathname === elem.href ? 'active' : 'text-white'}`}>{elem.content}</Link>
        </li>})}
       
        
      </ul>
    </div>
  </div>
</nav>
</>
}




  {/* </> className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent" */}
{/* <nav className='bg-green-500 py-5 px-16 flex flex-col md:flex-row justify-between items-center'>
   <div className="">    
     <ul className='flex flex-col md:flex-row gap-4 text-white text-xl'>
             {/* <i className='menu fa-solid fa-bars block md:hidden'></i> */}
        
        {/* <li><Link className='flex items-center' href={'/'}>
        <i className="fa-solid fa-cart-shopping"></i>
        <span>freshCart</span>
        </Link></li>
        <li><Link className={path==='/' ? 'active' : ''} href={'/'}>Home</Link></li>
        <li><Link className={path==='/Cart' ? 'active' : ''} href={'/Cart'}>Cart</Link></li>
        <li><Link className={path==='/Products' ? 'active' : ''} href={'/Products'}>Products</Link></li>
        <li><Link className={path==='/Categories' ? 'active' : ''} href={'/Categories'}>Categories</Link></li>
        <li><Link className={path==='/Brands' ? 'active' : ''} href={'/Brands'}>Brands</Link></li>
    </ul>
   </div>

    <ul className="flex gap-2 text-white">
        <li><i className='fa-brands fa-facebook'></i></li>
        <li><i className='fa-brands fa-twitter'></i></li>
        <li><i className='fa-brands fa-instagram'></i></li>
        <li><i className='fa-brands fa-linkedin'></i></li>
        <li><Link href={'/Register'}>Register</Link></li>
        <li><Link href={'/Login'}>Login</Link></li>
        <li><Link href={'/SignOut'}>SignOut</Link></li>


    </ul>
  </nav> */}
  //  <li className='relative py-3 flex gap-3'>
  //         {CartData?.numOfCartItems>0?<span className=" absolute start-3 -top-[25px] bg-green-400 text-white p-1 rounded-full">{CartData?.numOfCartItems}</span>:""}
  //         <Link onClick={closeComponent}href={'/cart'}>
  //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  //         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
  //         </svg>
  //         </Link>
  //         {WishListData?.count>0?<span className=" absolute start-3 -top-[25px] bg-green-400 text-white p-1 rounded-full">{WishListData?.count}</span>:""}
  //         <Link onClick={closeComponent}href={'/WishList'}>
  //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  //         <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  //         </svg>
  //         </Link>
  //       </li>