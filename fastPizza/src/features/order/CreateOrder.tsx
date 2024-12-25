import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import { useState } from 'react'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { cartState, userState } from '../../utils/interfaces'
import EmptyCart from '../cart/EmptyCart'
import store from '../../store'
import { getCartPrice } from '../cart/CartSlice'
import { formatCurrency } from '../../utils/helpers'
import { fetchAddress } from '../user/userSlice'
import { UnknownAction } from '@reduxjs/toolkit'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  )

// Priority price is 20% of the total cart price
const PRIORITY_PRICE = 20
function CreateOrder() {
  const formErrors = useActionData()
  const isSubmitting = useNavigation().state === 'submitting'
  const [withPriority, setWithPriority] = useState(false)
  const cart = useSelector((state: cartState) => state.cart.cart)
  const {
    username,
    status: addressStatus,
    position,
    address,
  } = useSelector((state: userState) => state.user)
  const isLoadingAddress = addressStatus === 'loading'
  const dispatch = useDispatch()
  let cartPrice = getCartPrice(cart)
  //! The API is rounding the price to the nearest integer so we need some visual consistency
  if (withPriority) cartPrice += Math.round(cartPrice * (PRIORITY_PRICE / 100))
  if (!cart.length) return <EmptyCart />
  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order?</h2>

      <Form method='POST'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
            defaultValue={username}
            type='text'
            name='customer'
            required
            autoComplete=''
            className='input grow'
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input type='tel' name='phone' required className='input w-full' />
            {formErrors?.phone && (
              <div className='mt-2 rounded-md bg-red-200 p-2 text-xs text-red-700'>
                {formErrors.phone}
              </div>
            )}
          </div>
        </div>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              type='text'
              name='address'
              disabled={isLoadingAddress}
              defaultValue={address}
              required
              className='input w-full'
            />
            {addressStatus === 'error' && (
              <div className='mt-2 rounded-md bg-red-200 p-2 text-xs text-red-700'>
                "We couldn't retrieve your address at the moment"
              </div>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className='absolute right-0 top-9 z-50 mr-1 sm:top-0 sm:mt-[5px]'>
              <Button
                disabled={isLoadingAddress}
                type='small'
                onclick={(
                  e:
                    | React.MouseEvent<HTMLButtonElement, MouseEvent>
                    | undefined,
                ) => {
                  e?.preventDefault()
                  dispatch(fetchAddress() as unknown as UnknownAction)
                }}
              >
                Get location
              </Button>
            </span>
          )}
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            value='true'
            checked={withPriority}
            onChange={e => setWithPriority(e.target.checked)}
            className='h-6 w-6 accent-yellow-400 focus:ring-offset-2'
          />
          <label htmlFor='priority' className='font-medium'>
            Want to give your order priority?
          </label>
        </div>
        <div>
          <Button disabled={isSubmitting || isLoadingAddress}>
            <input type='hidden' name='cart' value={JSON.stringify(cart)} />
            <input
              type='hidden'
              name='position'
              value={
                position.longitude && position.latitude
                  ? `${(position.latitude, position.longitude)}`
                  : ''
              }
            />
            {isSubmitting
              ? 'Placing order'
              : `Order now (${formatCurrency(cartPrice)})`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export const action: ActionFunction = async ({
  request,
}: {
  request: Request
}) => {
  const formData = await request.formData()
  const dataObject = Object.fromEntries(formData)
  const order = {
    ...dataObject,
    cart: JSON.parse(dataObject.cart as string),
    priority: dataObject.priority === 'true',
  } as {
    customer: string
    phone: string
    address: string
    cart: unknown[]
    priority: boolean
  }
  const errors = {} as { [key: string]: string }
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }

  if (Object.keys(errors).length > 0) return errors

  // if no errors, create the order and redirect to the order page
  const newOrder = await createOrder(order)
  store.dispatch({ type: 'cart/clearCart' })
  return redirect(`/order/${newOrder.id}`)
}
export default CreateOrder
