import { createSlice } from '@reduxjs/toolkit'
import { CartItem } from '../../utils/interfaces'

const initialState = {
  cart: [] as CartItem[],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action: { payload: CartItem }) {
      // Check if the pizza is already in the cart
      const pizza = state.cart.find(
        (pizza) => pizza.pizzaId === action.payload.pizzaId,
      )
      if (pizza) {
        // If it is, increase the quantity
        increaseItemQuantity({ pizzaId: action.payload.pizzaId })
        return
      }
      state.cart.push(action.payload)
    },
    removePizza(state, action: { payload: number }) {
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId !== action.payload,
      )
    },
    increaseItemQuantity(state, action: { payload: { pizzaId: number } }) {
      const { pizzaId } = action.payload
      const pizza = state.cart.find((pizza) => pizza.pizzaId === pizzaId)
      if (pizza && pizza.quantity >= 0) {
        pizza.quantity++
        pizza.totalPrice = pizza.quantity * pizza.unitPrice
      }
    },
    decreaseItemQuantity(state, action: { payload: { pizzaId: number } }) {
      const { pizzaId } = action.payload
      const pizza = state.cart.find((pizza) => pizza.pizzaId === pizzaId)
      if (pizza && pizza.quantity > 0) {
        pizza.quantity--
        pizza.totalPrice = pizza.quantity * pizza.unitPrice
      }
      if (pizza && pizza.quantity === 0) {
        removePizza(pizzaId)
        return
      }
    },
    clearCart(state) {
      state.cart = []
    },
  },
})

export const {
  addPizza,
  removePizza,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions
export default cartSlice.reducer

export const getCartPrice = (cart: CartItem[]) =>
  cart.reduce((acc, item) => acc + item.totalPrice, 0)

export const getCartQuantity = (cart: CartItem[]) =>
  cart.reduce((acc: number, item: CartItem) => acc + item.quantity, 0)

export const isItemInCart = (cart: CartItem[], pizzaId: number) => {
  const item = cart.find((item) => item.pizzaId === pizzaId)?.quantity
  return item == undefined ? false : item > 0 ? true : false
}
