import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../apiRestaurant';
import { useState } from 'react';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const formErrors = useActionData();
  const isSubmitting = useNavigation().state === 'submitting';
  const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order?</h2>

      <Form method='POST'>
        <div>
          <label>First Name</label>
          <input type='text' name='customer' required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type='tel' name='phone' required />
          </div>
          {formErrors?.phone && <div>{formErrors.phone}</div>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type='text' name='address' required />
          </div>
        </div>

        <div>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority.toString()}
            onChange={e => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority'>Want to yo give your order priority?</label>
        </div>
        <div>
          <button disabled={isSubmitting}>
            <input type='hidden' name='cart' value={JSON.stringify(cart)} />
            {isSubmitting ? 'Placing order' : 'Order now'}
          </button>
        </div>
      </Form>
    </div>
  );
}

export const action: ActionFunction = async ({
  request,
}: {
  request: Request;
}) => {
  const formData = await request.formData();
  const dataObject = Object.fromEntries(formData);
  const order = {
    ...dataObject,
    cart: JSON.parse(dataObject.cart as string),
    priority: dataObject.priority === 'on',
  } as {
    customer: string;
    phone: string;
    address: string;
    cart: unknown[];
    priority: boolean;
  };

  const errors = {} as { [key: string]: string };
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (Object.keys(errors).length > 0) return errors;

  // if no errors, create the order and redirect to the order page
  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
};
export default CreateOrder;