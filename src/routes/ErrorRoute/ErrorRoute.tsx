import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { getErrorMessage } from "../../utils/langUtils";

function getMessage(error: unknown) {
  if (isRouteErrorResponse(error)) {
    return `${error.status} - ${error.statusText}`;
  } else {
    return getErrorMessage(error);
  }
}

export default function ErrorRoute() {
  const error = useRouteError();
  return (
    <article aria-labelledby="error-title">
      <h1>An error has occurred!</h1>
      <p>{getMessage(error)}</p>
    </article>
  );
}
