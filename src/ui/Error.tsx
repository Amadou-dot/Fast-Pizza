import { useNavigate, useRouteError } from 'react-router-dom';
import ButtonLink from './ButtonLink';

export default function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div>
      <h1>{error.status} {error.statusText} 😢</h1>
      <p>{error.data}</p>
      <p>{error.message}</p>
      <ButtonLink onClick={() => navigate(-1)}>&larr; Go back</ButtonLink>
    </div>
  );
}