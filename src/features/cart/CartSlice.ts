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
        pizza.quantity++
        return
      }
      state.cart.push(action.payload)
    },
    removePizza(state, action: { payload: CartItem }) {
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId !== action.payload.pizzaId,
      )
    },
    increaseItemQuantity(state, action: { payload: { pizzaId: number} }) {
      const { pizzaId } = action.payload
      const pizza = state.cart.find((pizza) => pizza.pizzaId === pizzaId)
      if (pizza) {
        pizza.quantity++
        pizza.totalPrice = pizza.quantity * pizza.unitPrice
      }
    },
    decreaseItemQuantity(state, action: { payload: { pizzaId: number} }) {
      const { pizzaId } = action.payload
      const pizza = state.cart.find((pizza) => pizza.pizzaId === pizzaId)
      if (pizza) {
        pizza.quantity--
        pizza.totalPrice = pizza.quantity * pizza.unitPrice
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
