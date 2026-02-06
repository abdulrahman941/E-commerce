import React from 'react'
import  CheckOutForm  from '../../_components/CheckOutForm/CheckOutForm';

export default async function CheckOut({params}:{params:{cartId:string}}) {
  const {cartId}= await params
  console.log(cartId)
  return <>
  <CheckOutForm cartId={cartId}></CheckOutForm>
  </>
}
