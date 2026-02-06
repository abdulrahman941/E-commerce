import React from 'react'
import Slider from '../slider/slider'


export default async function categorySlider() {
let response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
let {data} = await response.json()

  return <>
<div className="pt-10">
  <Slider data={data}/>

</div>

  </>
}
