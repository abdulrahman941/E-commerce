'use client'

import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { zodResolver } from '@hookform/resolvers/zod'
import { log } from 'console'
import { schema } from '../../../schema/RegisterValidation.schema'
import * as z from 'zod'

type FormData = z.infer<typeof schema>
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Eye } from 'lucide-react'
import Link from 'next/link'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  let router =useRouter()
const form = useForm({
   defaultValues:{
    name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:''
   },
   resolver:zodResolver(schema),
   mode:'onBlur',
  reValidateMode:'onBlur'
})
async function handleRegister(values: FormData){

 try {
   let {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
  console.log(data);
  if(data.message=='success'){
    toast.success("Register successfully")
    router.push('/Login')
  }

 } catch (error) {

  console.log(error);
 }

}

  return <>
  <div className="container mx-auto my-12 w-[60%] bg-gray-100 rounded-md py-5">
    <h1 className='text-green-600 text-3xl text-center'>Register</h1>
       <form onSubmit={form.handleSubmit(handleRegister)}>
      <div className="flex justify-center items-center">
        <FieldSet className="w-full max-w-xs">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Username</FieldLabel>
          <Input {...form.register('name')} id="name" type="text" placeholder="enter the userName" />
          {form.formState.errors.name && <p className="text-red-500">{form.formState.errors.name.message}</p>}
        </Field>
        <Field>
          <FieldLabel htmlFor="email">email</FieldLabel>
          <Input {...form.register('email')} id="email" type="email" placeholder="enter the email address" />
          {form.formState.errors.email && <p className="text-red-500">{form.formState.errors.email.message}</p>}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input {...form.register('password')} id="password" type={showPassword?"text":"password"} placeholder="enter the password" />
          {form.formState.errors.password && <p className="text-red-500">{form.formState.errors.password.message}</p>}
        </Field>
         <Field>
          <FieldLabel htmlFor="rePassword">rePassword</FieldLabel>
          <Input {...form.register('rePassword')} id="rePassword" type={showPassword?"text":"password"} placeholder="enter the rePassword" />
          {form.formState.errors.rePassword && <p className="text-red-500">{form.formState.errors.rePassword.message}</p>}
        </Field>
         <Field>
          <FieldLabel htmlFor="phone">phone number</FieldLabel>
          <Input {...form.register('phone')} id="phone" type="tel" placeholder="enter the phone number" />
          {form.formState.errors.phone && <p className="text-red-500">{form.formState.errors.phone.message}</p>}
        </Field>
      </FieldGroup>
    </FieldSet>
      </div>
   

     <div className="flex flex-wrap justify-center items-center gap-10 md:flex-row p-5">
      <Button type="submit" className="w-1/2 md:w-1/4 bg-green-400 text-white hover:bg-green-500 hover:text-white cursor-pointer"variant="outline">Register</Button>
    </div>
    <p className='text-center'>Don't have an account yet?<Link className="text-green-400"href={'/Auth/Login'}> Signin</Link></p>

    </form>


    </div>
  
  </>
  
}
