import { forwardRef, useContext } from "react";
import FormContext from "./FormContext";
import classNames from "classnames";
import { IInputProps } from "../../react-types";

interface Props extends IInputProps {
  id?: string;
  type?: "checkbox" | "radio";
}

const FormCheckbox = forwardRef<HTMLInputElement, Props>(
  ({ className, id, type = "checkbox", ...props }, ref) => {
    const controlId = useContext(FormContext);
    return (
      <input
        {...props}
        ref={ref}
        className={classNames("form-check", className)}
        id={id || controlId}
        type={type}
      />
    );
  }
);

export default FormCheckbox;
