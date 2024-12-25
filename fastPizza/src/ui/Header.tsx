import { Link } from 'react-router-dom'
import Search from '../features/order/Search'
import Username from '../features/user/Username'

export default function Header() {
  return (
    <header className='flex items-center justify-between border-b border-stone-300 bg-yellow-500 px-4 py-3 uppercase sm:px-6'>
      <Link to='/' className='tracking-widest'>
        Fast React Pizza Co.
      </Link>
      <Search />
      <Username />
    </header>
  )
}
