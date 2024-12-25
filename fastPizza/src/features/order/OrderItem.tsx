import { formatCurrency } from '../../utils/helpers'
import { CartItem } from '../../utils/interfaces'

function OrderItem({
  item,
  isLoadingIngredients,
  ingredients,
}: {
  item: CartItem
  isLoadingIngredients: boolean
  ingredients: string[]
}) {
  const { quantity, name, totalPrice } = item

  return (
    <li className='py-3'>
      <div className='flex items-center justify-between text-sm'>
        <p>
          <span className='font-bold'>{quantity}&times;</span> {name}
        </p>
        <p className='font-bold'>{formatCurrency(totalPrice)}</p>
      </div>
      <p className='text-sm capitalize italic text-stone-500'>
        {!isLoadingIngredients && ingredients?.join(', ')}
      </p>
    </li>
  )
}

export default OrderItem
