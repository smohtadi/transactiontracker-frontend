import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Text } from "../../components";
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
    <>
      <Text.H1>An error has occurred!</Text.H1>
      <Text.P>{getMessage(error)}</Text.P>
    </>
  );
}
