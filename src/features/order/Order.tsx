// Test ID: IIDSAT

import { useLoaderData } from 'react-router-dom'
import { getOrder } from '../../apiRestaurant'
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers'
import OrderItem from './OrderItem'

function Order() {
  const order = useLoaderData()
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order
  const deliveryIn = calcMinutesLeft(estimatedDelivery)

  return (
    <div className='space-y-8 px-4 py-6'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold'>Status for order #{id}</h2>

        <div className='space-x-2'>
          {priority && (
            <span className='rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50'>
              Priority{' '}
            </span>
          )}
          <span className='rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50'>
            {status} order
          </span>
        </div>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-2 bg-stone-300 px-6 py-5'>
        <p className='font-medium'>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className='text-xs text-stone-500'>
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className='divide-y divide-stone-300 border-b border-t border-stone-300'>
        {cart.map((item) => (
          <OrderItem
            key={item.id}
            item={item}
            isLoadingIngredients={undefined}
            ingredients={undefined}
          />
        ))}
      </ul>
      
      <div className='space-y-2 bg-stone-300 px-6 py-5'>
        <p className='text-sm font-medium text-stone-500'>
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className='text-sm font-medium text-stone-500'>
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className='font-bold'>
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  )
}
export const loader = async ({ params }) => await getOrder(params.orderId)
export default Order
