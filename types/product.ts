// export interface Product {
//   _id: string;
//   title: string;
//   price: number;
//   description: string;
//   category: {
//   name: string;
//   };
//   imageCover: string;
//   image?: string;
//   name?:string;
//   brand?: string;
//   ratingsAverage?: number;
//   stock?: number;
//   // Add more fields as needed based on the API response
// }
export default interface product{
    sold?: number
    images: Array<string>
    subcategory: Array<{
      _id: string
      name: string
      slug: string
      category: string
    }>
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    imageCover: string
    category: {
      _id: string
      name: string
      slug: string
      image: string
    }
    brand: {
      _id: string
      name: string
      slug: string
      image: string
    }
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    id: string
    priceAfterDiscount?: number
    availableColors?: Array<any>
  }

