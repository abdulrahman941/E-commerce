import {Brand}  from '../../types/Brand'
import Image from 'next/image'
import React from 'react'

export default async function brands() {
  let response = await fetch('https://ecommerce.routemisr.com/api/v1/brands')
  let {data:allBrands}:{data:Brand[]} = await response.json()
  console.log(allBrands)


  return <>
  <div className="container mx-auto w-[80%] py-4">
      <div className="flex flex-wrap">
         {allBrands.map((brand)=><div key={brand._id} className="w-full sm:w-1/2 lg:w-1/3">
      <div className="inner p-4 border rounded-md">
            <Image src={brand.image} alt="test" width={500} height={500}  />
            <h2 className='text-2xl text-green-600 text-center'>{brand.name}</h2>
      </div>
       </div>
        )}
        </div>
     
    </div>
  
  </>
}
