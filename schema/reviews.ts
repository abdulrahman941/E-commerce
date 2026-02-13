import * as z from "zod";




 export const schema = z.object({
    review:z.string()
    .nonempty('this field required')
    .min(3,'min least must be at least 3 char')
    .max(100,'max length at least 100'),
     rating:z.coerce.number()
     .min(1,"your must rating at least 1")
     .max(5,"your must rating at most 5")
 })