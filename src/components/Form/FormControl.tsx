import { forwardRef, useContext } from "react";
import classNames from "classnames";
import FormContext from "./FormContext";
import { IInputProps } from "../../react-types";

interface Props extends IInputProps {
  type?: string;
}
const FormControl = forwardRef<HTMLInputElement, Props>(
  ({ className, id, type = "text", ...props }, ref) => {
    const controlId = useContext(FormContext);
    return (
      <input
        {...props}
        ref={ref}
        className={classNames("form-control", className)}
        id={id || controlId}
        type={type}
      />
    );
  }
);
export default FormControl;
