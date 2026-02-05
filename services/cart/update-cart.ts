"use server"
import { getAccessToken } from "../../schema/access-token"

export async function updateCartItem({productId,count}:{productId:string,count:number}){
     const token = await getAccessToken()
     console.log(token);
     
    if(!token){
        throw new Error ('unauthorized...')
    }
  const response= await fetch(`${process.env.API}/cart/${productId}`,{
    method:'PUT',
    headers:{
        'token':token,
        'Content-Type':'application/json'
    },
     body:JSON.stringify({
        count:count
     })
  })
      const payload =await response.json()
      console.log(payload)
      return payload

}