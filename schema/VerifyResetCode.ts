import * as z from "zod";




 export const schema = z.object({

    resetCode:z.string('Reset code is invalid or has expired').nonempty('this field required')
 })