import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import cartReducer from './features/cart/CartSlice'
export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
})
