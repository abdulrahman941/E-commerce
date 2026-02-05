import React from 'react'
import getProducts from '../../api/Products.api';
import ProductCard from '../_components/ProductCard/ProductCard';
import Product from '../../types/Product'


// interface product {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   image: string;
//   imageCover: string;
//   ratingsAverage: number;
//   category: {
//     name: string;
//   };
//   [key: string]: unknown;
// }
export default async function Products() {
        let data = await getProducts()
  
 
  return <>
   <div className="container mx-auto w-[80%]">
   <div className="flex flex-wrap">
      {data.map((product: Product) => 
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
