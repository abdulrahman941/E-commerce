import React from 'react'
import getProducts from '../../../api/Products.api'
import ProductCard from '../ProductCard/ProductCard'
import  product  from '../../../types/product'
import { log } from 'console'

export default async function AllProducts() {
      let data = await getProducts()
      console.log(data);
      

  return <>
  <div className="container mx-auto w-[80%]">
   <h3 className='py-5 text-2xl'>Products</h3>
     <div className="flex flex-wrap">
        {data.map((product: product) => 
        <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/5">
          <div className="product p-5">
       <ProductCard product={product}/>
  
     </div>
    </div>
  )}
  
     </div>
     </div>
  
  </>
}
