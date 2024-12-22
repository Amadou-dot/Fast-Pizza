import { useSelector } from "react-redux";

export default function Username() {
  const name = useSelector((state) => state.user.username);
  return name && <p className='hidden text-sm font-semibold normal-case md:block'>{name}</p> || null;
}
