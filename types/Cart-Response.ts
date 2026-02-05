export type CartResponse = {
  status: string
  numOfCartItems: number
  cartId: string
  data: {
    _id: string
    cartOwner: string
    products: Array<{
      count: number
      _id: string
      product: {
        subcategory: Array<{
          _id: string
          name: string
          slug: string
          category: string
        }>
        _id: string
        title: string
        quantity: number
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
        id: string
      }
      price: number
    }>
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
  }
}
export type shipping={
    details: string
    phone: string
    city: string
}
