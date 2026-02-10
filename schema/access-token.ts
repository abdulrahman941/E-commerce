import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getAccessToken(){
    const authToken =((await cookies()).get('__Secure-next-auth.session-token')?.value)
    const token= await decode({
        token:authToken,
        secret:"izdbM4ppU68hTKTzrC/aJRPZiBcmOio67tBEM3bN0OM="!
    })
        console.log(token)

    return token?.token
}