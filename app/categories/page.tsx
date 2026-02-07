import { log } from 'node:console'
import React from 'react'
import  Image  from 'next/image';
import { category } from '../../types/category';
import Link from 'next/link';

export default async function Categories() {
let response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
let {data} = await response.json()
console.log(data)


  return <>
  <div className="container mx-auto w-[80%]">
    <div className="flex flex-wrap">
       {data.map((category:category)=><div key={category._id}className="w-full sm:w-1/2 lg:w-1/3">
    <div className="inner p-4 border rounded-md">
       <Link href={`/categories/${category._id}`}>
         <Image src={category.image} alt="test" width={500} height={500}  />
          <h2 className='text-2xl text-green-600 text-center'>{category.name}</h2>
         
      </Link>
    </div>
     </div>
      )}
      </div>
   
  </div>
  </>
}
