import { useSelector } from "react-redux";
import { userState } from "../../utils/interfaces";

export default function Username() {
  const name = useSelector((state:userState) => state.user.username);
  return name && <p className='hidden text-sm font-semibold normal-case md:block'>{name}</p> || null;
}
