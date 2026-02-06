"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'
import { log } from 'console';
import { category, categoryArray } from '@/types/category';


export default function Slider({data}:{data:categoryArray}) {
    console.log(data)

  return <>
  <div className="container mx-auto">
    <h3 className='py-5 text-2xl px-5'>Shop Popular Categories</h3>
<Swiper spaceBetween={0} breakpoints={{320:{slidesPerView:2},640:{slidesPerView:3},768:{slidesPerView:4},1024:{slidesPerView:7}}} modules={[Autoplay]} autoplay={{delay:4000}}>

    {data?.map((product:category)=><SwiperSlide>
        <img className="h-50" src={product.image} alt="slider"/>
        <h2>{product.name}</h2>
      </SwiperSlide>)}



    </Swiper>
  </div>

  </>
}