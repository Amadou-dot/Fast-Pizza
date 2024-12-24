import { formatCurrency } from '../../utils/helpers'
import { CartItem as CartItemProps } from '../../utils/interfaces'
import DeleteItem from './DeleteItem'

function CartItem({ item }: { item: CartItemProps }) {
  const { pizzaId, name, quantity, totalPrice } = item
  return (
    <li
      className='py-3 sm:flex sm:items-center sm:justify-between'
      key={pizzaId}
    >
      <p className='mb-1 sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
        <DeleteItem id={pizzaId}/>
      </div>
    </li>
  )
}

export default CartItem
