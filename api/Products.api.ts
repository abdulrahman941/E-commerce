
import type product from '../types/product';



export default async function getProducts(){ 
let response =await fetch(`https://ecommerce.routemisr.com/api/v1/products`,{
    method:'get',
    next:{revalidate:60}
})

let {data:Product} = await response.json()
console.log('Raw API data:', Product[0]) // Log first product to see structure
// Ensure id is set to _id for each product
const productWithId = Product.map((Product: any) => ({
    ...Product,
    id: Product._id
}));
return productWithId

}
