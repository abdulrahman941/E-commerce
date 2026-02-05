import * as z from "zod";




 export const schema = z.object({
    email:z.email('invalid mail').nonempty('this field required'),
    newPassword:z.string().nonempty('this field required').min(6,'password required'),
 })