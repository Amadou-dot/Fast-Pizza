import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartItem } from '../../utils/interfaces'
import { getCartPrice, getCartQuantity } from './CartSlice'

function CartOverview() {
  const cart = useSelector(
    (state: { cart: { cart: CartItem[] } }) => state.cart.cart,
  )
  return (
    <div className='flex items-center justify-between bg-stone-800 p-4 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base'>
      <p className='space-x-2 text-stone-300 sm:space-x-6'>
        <span className='font-semibold'>{getCartQuantity(cart)} pizzas</span>
        <span>${getCartPrice(cart)}</span>
      </p>
      <Link to='/cart'>View cart</Link>
    </div>
  )
}

export default CartOverview
