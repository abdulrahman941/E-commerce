"use client"

import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { zodResolver } from '@hookform/resolvers/zod'
import { log } from 'console'
import * as z from 'zod'

type FormData = z.infer<typeof schema>
import { toast } from "sonner"
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios'
import Home from '../../page';
import { schema } from '../../../schema/Login'
import { signIn } from 'next-auth/react';
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
export default function LoginClient() {
  const searchparams = useSearchParams()
  const callbackUrl= searchparams.get('callback-url')
  
  const [Isloading, setIsloading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
   defaultValues:{
    email:'',
    password:''
   },
   resolver:zodResolver(schema),
   mode:'onBlur',
  reValidateMode:'onBlur'
})
async function handleLogin(values: FormData){
  setIsloading(true)
 const response = await signIn("credentials",{
    email:values.email,
    password:values.password,
    callbackUrl:callbackUrl?? '/',
    redirect:false
  })
     



  console.log(response)
  if(response?.ok){
    //home
    toast.success("successfull login")
    window.location.href=response.url ||"/"

  }else{
    toast.error("invalid email or password")
  }
  setIsloading(false)
}


 
  return <>
   <div className="container mx-auto my-12 w-[60%] bg-gray-100 rounded-md py-5">
      <h1 className='text-green-600 text-3xl text-center'>Login</h1>
         <form onSubmit={form.handleSubmit(handleLogin)}>
        <div className="flex justify-center items-center">
          <FieldSet className="w-full max-w-xs">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">email</FieldLabel>
            <Input {...form.register('email')} id="email" type="email" placeholder="enter the email address" />
            {form.formState.errors.email && <p className="text-red-500">{form.formState.errors.email.message}</p>}
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input {...form.register('password')} id="password" type={showPassword?"text":"password"} placeholder="enter the password"/>
            {form.formState.errors.password && <p className="text-red-500">{form.formState.errors.password.message}</p>}
            <p className='text-sm'>Forget password?<Link className='text-green-400 pr-10' href={'/Auth/ForgetPassword'}> Reset it here</Link></p>
          </Field>
        </FieldGroup>
      </FieldSet>
        </div>
     
  
       <div className="flex flex-wrap justify-center items-center gap-10 md:flex-row p-5">
        <Button disabled={Isloading} type="submit" className="w-1/2 md:w-1/4 bg-green-400 text-white hover:bg-green-500 hover:text-white cursor-pointer"variant="outline">
        {Isloading? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>:"submit"}
        </Button>
      </div>
            <p className='text-center'>Don't have an account yet?<Link className="text-green-400"href={'/auth/register'}> SignUp</Link></p>
  
      </form>
  
  
      </div>
  </>
  
}
