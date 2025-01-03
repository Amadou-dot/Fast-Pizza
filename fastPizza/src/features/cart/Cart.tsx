import ButtonLink from '../../ui/ButtonLink'
import Button from '../../ui/Button'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { cartState, userState } from '../../utils/interfaces'
import { clearCart } from './CartSlice'
import EmptyCart from './EmptyCart'

function Cart() {
  const name = useSelector((state: userState) => state.user.username)
  const cart = useSelector((state: cartState) => state.cart.cart)
  const dispatch = useDispatch()
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  return (
    <div className='flex flex-col gap-4 px-4 py-3'>
      {cart.length > 0 && (
        <>
          <ButtonLink to='/menu'>&larr; Back to menu</ButtonLink>

          <h2 className='mt-7 text-xl font-semibold capitalize'>{`${name ? `${name}'s cart` : 'your cart'}`}</h2>
          <ul className='mt-3 divide-y divide-stone-300 border-b border-stone-300'>
            {cart
              .filter(item => item.quantity !== 0)
              .map(item => (
                <CartItem key={item.pizzaId} item={item} />
              ))}
          </ul>
          <div className='mt-6 space-x-2'>
            <Button to='/order/new'>Place order</Button>
            <Button type='secondary' onclick={handleClearCart}>
              Clear cart
            </Button>
          </div>
        </>
      )}
      {cart.length === 0 && <EmptyCart />}
    </div>
  )
}

export default Cart
