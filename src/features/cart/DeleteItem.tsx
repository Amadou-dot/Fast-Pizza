import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { decreaseItemQuantity } from './CartSlice'

export default function DeleteItem({ id }: { id: number }) {
  const dispatch = useDispatch()
  return (
    <Button type='small' onclick={() => dispatch(decreaseItemQuantity({pizzaId: id}))}>
      Remove
    </Button>
  )
}
