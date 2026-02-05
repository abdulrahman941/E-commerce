import * as z from "zod";




 export const schema = z.object({
    name:z.string()
    .nonempty('this field required')
    .min(3,'min least must be at least 3 char')
    .max(20,'max length at least 20'),
    email:z.email('invalid mail').nonempty('this field required'),
    password:z.string().nonempty('this field required').min(6,'password required'),
    rePassword:z.string(),
    phone:z.string().trim().regex(/^01[0125][0-9]{8}$/,'invalid phone number'),
 }).refine((object)=>object.password==object.rePassword,{
    path:['rePassword'],
    message:'password and rePassword must be same'
 })