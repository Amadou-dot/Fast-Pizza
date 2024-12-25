import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem'
import { Pizza } from '../../utils/interfaces'

export default function Menu() {
  const menu: Pizza[] = useLoaderData()
  return (
    <ul className='divide-y divide-stone-300 px-2'>
      {menu.map(pizza => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  )
}

export const loader = async () => await getMenu()
