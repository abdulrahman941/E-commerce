import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const token = await getToken({req})
    if(!token){
        return NextResponse.json({error:'unauthorized',status:401})
    }
    const res=await fetch(`${process.env.API}/wishlist`,{
        headers:{
        token:token.token,
        'content-Type':'application/json'
        }
    })
    const payload =await res.json()
    return NextResponse.json(payload)
}