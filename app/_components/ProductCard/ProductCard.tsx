import React from 'react'
import Link from 'next/link'
import {Card,CardAction,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import AddBtn from '../AddBtn/AddBtn';
import product from '@/types/product';


export default function ProductCard({product}:{product:product}) {
  return <>
      <Card>
   <Link href={`/Products/${product._id}`}>
        <CardHeader>
          <CardTitle>
             <img src={product.imageCover} alt="" />
          </CardTitle>
          <CardDescription>{product.category.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-1">{product.title}</p>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between w-full">
            <span>{product.price}EGP</span>
            <span><i className="fa-solid fa-star text-yellow-500"></i>{product.ratingsAverage}</span>
          </div>
        </CardFooter>
         </Link>
         <AddBtn productId={product._id}/>
      </Card>
  </>

  
}
