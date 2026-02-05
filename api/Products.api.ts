
import type product from '../types/product';



export default async function getProducts(){ 
let response =await fetch(`https://ecommerce.routemisr.com/api/v1/products`,{
    method:'get',
    next:{revalidate:60}
})

let {data:product} = await response.json()
console.log('Raw API data:', product[0]) // Log first product to see structure
// Ensure id is set to _id for each product
const productWithId = product.map((product: any) => ({
    ...product,
    id: product._id
}));
return productWithId

}
