import React from 'react'
import ProductCard from '../_components/productCard/productCard';
import product from '../../types/product'

export async function getProducts(){ 
let response =await fetch(`https://ecommerce.routemisr.com/api/v1/products`,{
    method:'get',
    next:{revalidate:60}
})

let {data:product} = await response.json()
console.log('Raw API data:', product[0]) // Log first product to see structure
// Ensure id is set to _id for each product
const productWithId = product?.map((product: any) => ({
    ...product,
    id: product._id
}));
return productWithId

}

export default async function Products() {
  
        let data = await getProducts()
  
 
  return <>
   <div className="container mx-auto w-[80%]">
   <div className="flex flex-wrap">
      {data?.map((product: product) => 
      <div key={product._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/5">
        <div className="product p-5">
     <ProductCard product={product}/>

   </div>
  </div>
)}

   </div>
   </div>
  </>
    
  
}
