'use client';

import React from 'react'
// import { Button } from '@heroui/react';
import Error from '../../assets/Error.webp'
import  Link  from 'next/link';

export default function NotFound() {


  function GoHome(){
  
  }
  return <>
  <title>Error | Route Social</title>
  <div className="container mx-auto">
    <div className="mx-auto text-center h-screen py-3 flex-col gap-4">
    <div className="flex justify-center align-items-center">
      <img src={Error.src} alt="Error" />
    </div>
    <div className="">
     <h2>Page Not Found</h2>
    <p>The page you’re looking for doesn’t exist or has been moved.</p>
    <link href="">
    <button className="bg-sky-600 my-2">go to HOMEPAGE</button>
    </link>
    </div>
    </div>
  </div>
  </>
}
