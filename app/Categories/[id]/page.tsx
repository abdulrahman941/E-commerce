import React from 'react'

export default async function SpecificCategory({params}: {params:{id: string}}) {
     let {id}=await params
  let response =await fetch(`https://ecommerce.routemisr.com/api/v1/categories${id}`)
  console.log(id)
  let {data:SpecificCategory} =await response.json()
  console.log(SpecificCategory)
  
  return <>
  
  
  </>
}
