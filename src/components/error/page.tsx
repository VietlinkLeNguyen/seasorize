import { isRouteErrorResponse, useRouteError } from 'react-router';

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    const { status, statusText, data } = error;
    if (status === 404) {
      return (
        <div className="content-center text-center h-screen">
          <div>
            <h1 className="text-6xl">404</h1>
            <p>Page not found</p>
          </div>
        </div>
      );
    }
    if (status === 500) {
      return (
        <div className="content-center text-center h-screen">
          <div>
            <h1 className="text-6xl">500</h1>
            <p>Internal server error</p>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="content-center text-center h-screen">
      <p>Error: {JSON.stringify(error)}</p>
    </div>
  );
}
