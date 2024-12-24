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
      state.cart.push(action.payload)
    },

    removePizza(state, action: { payload: { pizzaId: number } }) {
      const { pizzaId } = action.payload
      state.cart = state.cart.filter((pizza) => pizza.pizzaId !== pizzaId)
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
        cartSlice.caseReducers.removePizza(state, action)
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
