import { useFetcher } from 'react-router-dom'
import Button from '../../ui/Button'
import { Order } from '../../utils/interfaces'
import { updateOrder } from '../../services/apiRestaurant'

export default function UpdateOrder({ order }: { order: Order }) {
  const fetcher = useFetcher()
  return (
    <fetcher.Form method='PATCH' className='text-right'>
      <Button type='primary' onclick={() => order}>
        Make Priority
      </Button>
    </fetcher.Form>
  )
}

export async function action({ params }: { params: { orderId: string } }) {
  const data = { priority: true }
  await updateOrder(params.orderId, data)
  return null
}
