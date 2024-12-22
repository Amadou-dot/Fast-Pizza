import ButtonLink from '../../ui/ButtonLink'
import Button from '../../ui/Button'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
]

function Cart() {
  const name = useSelector(state => state.user.username)
  const cart = fakeCart

  return (
    <div className='flex flex-col gap-4 px-4 py-3'>
      <ButtonLink to='/menu'>&larr; Back to menu</ButtonLink>

      <h2 className='mt-7 text-xl font-semibold'>{name}'s cart</h2>
      <ul className='mt-3 divide-y divide-stone-300 border-b border-stone-300'>
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>
      <div className='mt-6 space-x-2'>
        <Button to='/order/new'>Place order</Button>
        <Button type='secondary'>Clear cart</Button>
      </div>
    </div>
  )
}

export default Cart
