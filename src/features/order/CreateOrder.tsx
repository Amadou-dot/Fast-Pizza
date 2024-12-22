import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom'
import { createOrder } from '../../apiRestaurant'
import { useState } from 'react'
import Button from '../../ui/Button'
import { useSelector } from 'react-redux'
import { cartState, userState } from '../../utils/interfaces'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  )

function CreateOrder() {
  const formErrors = useActionData()
  const isSubmitting = useNavigation().state === 'submitting'
  const [withPriority, setWithPriority] = useState(false)
  const cart = useSelector((state: cartState) => state.cart.cart)
  const name = useSelector((state: userState) => state.user.username)
  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order?</h2>

      <Form method='POST'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
          defaultValue={name}
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

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              type='text'
              name='address'
              required
              className='input w-full'
            />
          </div>
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority.toString()}
            onChange={(e) => setWithPriority(e.target.checked)}
            className='h-6 w-6 accent-yellow-400 focus:ring-offset-2'
          />
          <label htmlFor='priority' className='font-medium '>
            Want to yo give your order priority?
          </label>
        </div>
        <div>
          <Button disabled={isSubmitting}>
            <input type='hidden' name='cart' value={JSON.stringify(cart)} />
            {isSubmitting ? 'Placing order' : 'Order now'}
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
    priority: dataObject.priority === 'on',
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
  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
  // return null
}
export default CreateOrder
