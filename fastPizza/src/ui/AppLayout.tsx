import { Outlet, useNavigation } from 'react-router-dom'
import CartOverview from '../features/cart/CartOverview'
import Header from './Header'
import Spinner from './Spinner'

export default function AppLayout() {
  const navigation = useNavigation()
  const isLoading = navigation.state == 'loading'
  return (
    <div className='grid h-dvh grid-rows-[auto_1fr_auto] gap-x-4'>
      {isLoading && <Spinner />}
      <Header />
      <div className='overflow-y-auto'>
        <main className='mx-auto max-w-3xl'>
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  )
}
