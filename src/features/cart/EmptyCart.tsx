import ButtonLink from '../../ui/ButtonLink'

function EmptyCart() {
  return (
    <div className='space-y-7 px-4 py-3'>
      <ButtonLink to='/menu'>&larr; Back to menu</ButtonLink>

      <p className='font-semibold'>
        Your cart is empty. Start adding some pizzas :)
      </p>
    </div>
  )
}

export default EmptyCart
