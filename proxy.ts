import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

const protectedPages=['/cart','/Profile','/WishList','allorders']
const authPages=['/Auth/Login','/Auth/Register','/Auth/ForgetPassword','/Auth/VerifyResetCode']

export default async function middleware(req:NextRequest){
  const token = await getToken({req})
  if(protectedPages.includes(req.nextUrl.pathname)){
    if(token){
        //cart
        return NextResponse.next()
    }else{
        //Login
        const redirectUrl = new URL('/Auth/Login',process.env.NEXTAUTH_URL)
        redirectUrl.searchParams.set('callback-url',req.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
    }
  }

  if(authPages.includes(req.nextUrl.pathname)){
    if(!token){
        //Login
        return NextResponse.next()
    }else{
        //Home
        const redirectUrl = new URL('/',process.env.NEXTAUTH_URL)
        return NextResponse.redirect(redirectUrl)
    }
  }
  return NextResponse.next()
}
