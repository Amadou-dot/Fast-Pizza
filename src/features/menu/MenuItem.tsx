import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'
import { Pizza } from '../../utils/interfaces'
import { addPizza } from '../cart/CartSlice'

function MenuItem({ pizza }: { pizza: Pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza
  const dispatch = useDispatch()
  const handleAddToCart = () => {
    dispatch(
      addPizza({
        pizzaId: id,
        name,
        unitPrice,
        quantity: 1,
        totalPrice: unitPrice,
      }),
    )
  }
  return (
    <li key={id} className='flex gap-4 py-2'>
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className='mt-0.5 flex grow flex-col'>
        <p className='font-medium'>{name}</p>
        <p className='text-sm capitalize italic text-stone-500'>
          {ingredients.join(', ')}
        </p>
        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='font-medium uppercase text-stone-500'>Sold out</p>
          )}
          {!soldOut && (
            <Button type='small' onclick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  )
}

export default MenuItem
