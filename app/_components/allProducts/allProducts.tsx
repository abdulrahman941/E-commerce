import React from 'react'
import  product  from '@/types/product'
import ProductCard from '../productCard/productCard';

export async function getProducts(){
let response =await fetch(`https://ecommerce.routemisr.com/api/v1/products`,{
    method:'get',
    next:{revalidate:60}
})

if (!response.ok) {
    console.error('Failed to fetch products:', response.statusText);
    return [];
}

let {data:product} = await response.json()
if (!product) {
    console.error('No product data received');
    return [];
}

console.log('Raw API data:', product[0]) // Log first product to see structure
// Ensure id is set to _id for each product
const productWithId = product?.map((product: any) => ({
    ...product,
    id: product._id
}));
return productWithId

}

export default async function AllProducts() {
      let data = await getProducts()
      console.log(data);
      

  return <>
  {/* product in Home page */}
  <div className="container mx-auto w-[80%]">
   <h3 className='py-5 text-2xl'>Products</h3>
     <div className="flex flex-wrap">
        {data?.map((product: product) => 
        <div key={product?.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/5">
          <div className="product p-5">
       <ProductCard product={product}/>
  
     </div>
    </div>
  )}
  
     </div>
     </div>
  
  </>
}
