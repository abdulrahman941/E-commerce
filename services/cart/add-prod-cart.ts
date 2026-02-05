"use server"
import { getAccessToken } from "../../schema/access-token"
import { log } from "node:console"

export async function addTocart(productId:string){
     const token = await getAccessToken()
     console.log(token);
     
    if(!token){
        throw new Error ('unauthorized...')
    }
  const response= await fetch(`${process.env.API}/cart`,{
    cache:'no-store',
    method:'post',
    headers:{
        'token':token,
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        productId
    })
  })
      const payload =await response.json()
      console.log(payload)
      return payload

}
//server action 