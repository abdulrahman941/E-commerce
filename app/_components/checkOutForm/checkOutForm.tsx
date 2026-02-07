"use client"

import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { PayCashOrder } from '@/services/paymentMethod/Pay-Cash'
import { shipping } from '@/types/Cart-Response'
import { PayOnlineOrder } from '@/services/paymentMethod/Pay-Online'
import {Select,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { schema } from '@/schema/CheckOutForm'
export default function CheckOutForm({cartId}:{cartId:string}) {
    async function paycash(cartId:string,shippingAddress:shipping){
        const response= await PayCashOrder(cartId,shippingAddress)
        console.log(response)
        if(response.status=="success"){
          toast.success("order will delivered soon..")
          window.location.href="/"
        }else{
          toast.error("error")

        }
        
    }
     async function payOnline(cartId:string,shippingAddress:shipping){
        const response= await PayOnlineOrder(cartId,shippingAddress)
        console.log(response)
        if(response.status=="success"){
          window.location.href=response.session.url
        }else{
          toast.error("error")

        }
        
    }
  const [paymentMethod, setPaymentMethod] = useState("payCash")
  const [Isloading, setIsloading] = useState(false)

  const form = useForm({
   defaultValues:{
    details:'',
    phone:'',
    city:''

   },
      resolver:zodResolver(schema),
      mode:'onBlur',
      reValidateMode:'onBlur'
   
})

async function SubmitForm(values: shipping){
    setIsloading(true)

  const shippingAddress={
    ...values
  }
  if (paymentMethod === "payCash") {
      await paycash(cartId,shippingAddress);
    } else {
      await payOnline(cartId,shippingAddress);
    }
    
    setIsloading(false);
  }

 
 



 
  return <>
   <div className="container mx-auto my-12 w-[60%] bg-gray-100 rounded-md py-5">
      <h1 className='text-green-600 text-3xl text-center'>shipping Address</h1>
         <form onSubmit={form.handleSubmit(SubmitForm)}>
        <div className="flex justify-center items-center">
          <FieldSet className="w-full max-w-xs">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="details">details</FieldLabel>
            <Input {...form.register('details')}id="details" type="string" placeholder="enter the details" />
            {form.formState.errors.details && <p className="text-red-500">{form.formState.errors.details.message}</p>}
          </Field>
          <Field>
            <FieldLabel htmlFor="phone">phone</FieldLabel>
            <Input {...form.register('phone')}id="phone" type="phone" placeholder="enter the mobile phone"/>
            {form.formState.errors.phone && <p className="text-red-500">{form.formState.errors.phone.message}</p>}
          </Field>
          <Field>
            <FieldLabel htmlFor="city">city</FieldLabel>
            <Input {...form.register('city')}id="city" type="city" placeholder="enter the city"/>
            {form.formState.errors.city && <p className="text-red-500">{form.formState.errors.city.message}</p>}
          </Field>
          <Label>Select a Payment Method:</Label>
             <Select onValueChange={(value) => setPaymentMethod(value)}>
             <SelectTrigger className="w-full">
             <SelectValue placeholder="ChooseMethod" />
             </SelectTrigger>
             <SelectContent>
             <SelectGroup>
             <SelectItem value="payCash">PayCash</SelectItem>
             <SelectItem value="PayOnline">PayOnline</SelectItem>
             </SelectGroup>
             </SelectContent>
             </Select>
        </FieldGroup>
      </FieldSet>
        </div>
     
  
       <div className="flex flex-wrap justify-center items-center gap-10 md:flex-row p-5">
        <Button onClick={()=>SubmitForm}disabled={Isloading} type="submit" className="w-1/2 md:w-1/4 bg-green-400 text-white hover:bg-green-500 hover:text-white cursor-pointer"variant="outline">
        {Isloading? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>:"Submit"}
        </Button>
      </div>

      </form>
  
  
      </div>
  </>
  
}
