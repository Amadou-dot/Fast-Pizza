import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button'
import { decreaseItemQuantity, increaseItemQuantity } from './CartSlice'
import { cartState } from '../../utils/interfaces'

export default function UpdateItemQuantity({id:pizzaId}: {id: number}) {
    const dispatch = useDispatch()
    const quantity = useSelector((state: cartState) => state.cart.cart.find((item) => item.pizzaId === pizzaId)?.quantity)
  return (
    <div className='flex gap-1 items-center md:gap-3'>
      <Button type='round' onclick={() => dispatch(decreaseItemQuantity({pizzaId}))}>-</Button>
      {quantity}
      <Button type='round' onclick={() => dispatch(increaseItemQuantity({pizzaId}))}>+</Button>
    </div>
  )
}
