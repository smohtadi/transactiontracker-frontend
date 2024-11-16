import classNames from "classnames";
import { forwardRef, useContext } from "react";
import FormContext from "./FormContext";
import { IProps } from "../../react-types";

interface Props extends IProps<HTMLLabelElement> {
  htmlFor?: string;
}

const FormLabel = forwardRef<HTMLLabelElement, Props>(
  ({ children, className, htmlFor, ...props }, ref) => {
    const controlId = useContext(FormContext);
    return (
      <label
        {...props}
        ref={ref}
        htmlFor={htmlFor || controlId}
        className={classNames("form-label", className)}
      >
        {children}
      </label>
    );
  }
);
export default FormLabel;
