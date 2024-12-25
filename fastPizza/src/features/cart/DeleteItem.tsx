import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { removePizza } from './CartSlice'

export default function DeleteItem({ id }: { id: number }) {
  const dispatch = useDispatch()
  return (
    <Button type='small' onclick={() => dispatch(removePizza({ pizzaId: id }))}>
      Remove
    </Button>
  )
}
