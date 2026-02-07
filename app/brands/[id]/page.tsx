import React from 'react'

export default async function SpecificBrands({params}: {params:{id: string}}) {
     let {id}=await params
  let response =await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  console.log(id)
  let result =await response.json()
  console.log(result)
  const brand = result.data; // استخراج بيانات البراند
  if(!brand){
    <div className="p-10 text-center">Loading Data ...</div>
  }

  
  return <>
   <div className="flex flex-col items-center justify-center p-10 border rounded-lg shadow-lg max-w-sm mx-auto my-10 bg-white">
            <h1 className="text-2xl font-bold mb-5 text-blue-600">
                Brand: {brand.name}
            </h1>
            
            <div className="overflow-hidden rounded-md border">
                <img 
                    src={brand.image} 
                    alt={brand.name} 
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            <p className="mt-4 text-gray-500 text-sm">
                Slug: {brand.slug}
            </p>
        </div>
  
  </>
}
