export interface Pizza {
  id: number
  name: string
  unitPrice: number
  imageUrl: string
  ingredients: string[]
  soldOut: boolean
}
export interface CartItem {
  pizzaId: number
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
}
export interface ApiResponse {
  status: string
  data: Pizza[]
}

export type cartState = { cart: { cart: CartItem[] } }
export type userState = {
  user: {
    username: string
    status: 'idle' | 'loading' | 'error'
    position: GeolocationCoordinates
    address: string
    error: string | undefined
  }
}
