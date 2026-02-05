"use client"
import React from 'react'
import {Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious,} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"


export default function ProductImg({images}:{images:string[]}) {
  return <>
  <Carousel
   plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
   opts={{
    loop: true,
  }}
  >
  <CarouselContent>
   {images.map((src)=>{return  <CarouselItem key={src}>
    <img src={src} alt="" />

    </CarouselItem>})}
   
  </CarouselContent>
</Carousel>
  
  
  </>
}
