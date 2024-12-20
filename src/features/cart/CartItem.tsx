import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'
interface CartItemProps {
  pizzaId: number,
  name: string,
  quantity: number,
  unitPrice: number,
  totalPrice: number,
}
function CartItem({ item } : { item: CartItemProps }) {
  const { pizzaId, name, quantity, totalPrice } = item

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between' key={pizzaId}>
      <p className='mb-1 sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
        <Button type='small'>Remove</Button>
      </div>
    </li>
  )
}

export default CartItem
