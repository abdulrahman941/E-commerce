"use client"

import React from 'react'
import Image from 'next/image'
import img1 from '../../../assets/Image E-commerce/slider-image-1.c48bcf4a276ee51f933f.jpg'
import img2 from '../../../assets/Image E-commerce/slider-image-2.f2e21d8020bf71047381.jpg'
import img3 from '../../../assets/Image E-commerce/slider-image-3.fef999d9726407227d80.jpg'
import img4 from '../../../assets/Image E-commerce/1681511865180.jpeg'
import img5 from '../../../assets/Image E-commerce/1681511156008.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'

export default function HomeSlider() {
  return <>
  <div className="container mx-auto w-[80%] flex">
   <div className="w-3/4">
   <Swiper spaceBetween={0} slidesPerView={1} modules={[Autoplay]} autoplay={{delay:4000}}>
      <SwiperSlide>
           <Image src={img1} alt="test" className="h-100 w-full object-cover" />
      </SwiperSlide>
       <SwiperSlide>
           <Image src={img2} alt="test" className="h-100 w-full object-cover" />
      </SwiperSlide>
       <SwiperSlide>
           <Image src={img3} alt="test" className="h-100 w-full object-cover" />
      </SwiperSlide>
     
    </Swiper>
   </div>
   <div className="w-1/4">
    <Image src={img4} alt="test" className="h-50 w-full object-cover" />
    <Image src={img5} alt="test" className="h-50 w-full object-cover" />
   </div>
   

  </div>
  
  </>
}
