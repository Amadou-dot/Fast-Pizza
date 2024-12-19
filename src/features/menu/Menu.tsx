import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../apiRestaurant';
import MenuItem from './MenuItem';
import { Pizza } from '../../utils/interfaces';

export default function Menu() {
  const menu: Pizza[] = useLoaderData();
  return (
    <ul>
      {menu.map(pizza => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export const loader = async () => await getMenu();
