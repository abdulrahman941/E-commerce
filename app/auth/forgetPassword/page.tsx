'use client'

import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '../../../components/ui/input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "../../../components/ui/button"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'


type FormData = z.infer<typeof schema>
import { toast } from "sonner"
import axios from 'axios'
import  {schema}  from '../../../schema/forgetPassword';

export default function ForgetPassword() {
  const [isLoading, setisLoading] = useState(false)
const router =useRouter()
const form = useForm({
   defaultValues:{
    email:''

   },
   resolver:zodResolver(schema),
   mode:'onBlur',
  reValidateMode:'onBlur'
})
async function handleforgetpassword(values: FormData){
  setisLoading(true)
 try {
   let {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
  console.log(data);
  if(data.statusMsg=='success'){
    toast.success("email successfully")
    router.push('/auth/verifyResetCode')

 }

 } catch (error) {

  console.log(error);
 }
    setisLoading(false)

}

  return <>
  <div className="container mx-auto my-12 sm:[35%] md:[50] lg:w-[60%] bg-gray-100 rounded-md py-5">
    <h1 className='text-green-600 text-3xl text-center'>Forget password</h1>
       <form onSubmit={form.handleSubmit(handleforgetpassword)}>
      <div className="flex justify-center items-center">
        <FieldSet className="w-full max-w-xs">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">email</FieldLabel>
          <Input {...form.register('email')} id="email" type="email" placeholder="enter the email address" />
          {form.formState.errors.email && <p className="text-red-500">{form.formState.errors.email.message}</p>}
        </Field>
      </FieldGroup>
    </FieldSet>
      </div>
   

     <div className="flex flex-wrap justify-center items-center gap-10 md:flex-row p-5">
      <Button disabled={isLoading} type="submit" className="w-1/2 md:w-1/4 bg-green-400 text-white hover:bg-green-500 hover:text-white cursor-pointer"variant="outline">
              {isLoading? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>:"Reset my Password"}
              </Button>
    </div>
    </form>


    </div>
  
  </>
  
}
