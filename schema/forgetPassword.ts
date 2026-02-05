import * as z from "zod";




 export const schema = z.object({
    email:z.email('invalid mail').nonempty('this field required')
 })