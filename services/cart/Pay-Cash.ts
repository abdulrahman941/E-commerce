"use server"
import { shipping } from "@/types/Cart-Response";
import { getAccessToken } from "../../schema/access-token"

export async function PayCashOrder(cartId:string,shippingAddress:shipping){
     const token = await getAccessToken()
     console.log(token);
     
    if(!token){
        throw new Error ('unauthorized...')
    }
  const response= await fetch(`${process.env.API}/orders/${cartId}`,{
    cache:'no-store',
    method:'post',
    headers:{
        'token':token,
        'Content-Type':'application/json'
    },
     body:JSON.stringify({
        shippingAddress
    })
   
  })
      const payload =await response.json()
      console.log(payload)
      return payload

}
//server action 