import { useNavigate, useRouteError } from 'react-router-dom';

type RouteError = {
  status?: number;
  statusText?: string;
  data?: string;
  message?: string;
};

export default function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  // const isRouteError = (error: unknown): error is RouteError => {
  //   return (
  //     typeof error === 'object' &&
  //     error !== null &&
  //     'status' in error &&
  //     'statusText' in error &&
  //     'data' in error &&
  //     'message' in error
  //   );
  // };

  // if (!isRouteError(error)) {
  //   return <div>{error.message}</div>;
  // }

  console.log(error);
  return (
    <div>
      <h1>{error.status} {error.statusText} 😢</h1>
      <p>{error.data}</p>
      <p>{error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}