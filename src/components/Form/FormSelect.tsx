import classNames from "classnames";
import { forwardRef, useContext } from "react";
import FormContext from "./FormContext";
import { ISelectProps } from "../../react-types";

interface Props extends ISelectProps {
  id?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, Props>(
  ({ children, className, id, ...props }, ref) => {
    const controlId = useContext(FormContext);
    return (
      <select
        {...props}
        ref={ref}
        className={classNames("form-select", className)}
        id={id || controlId}
      >
        {children}
      </select>
    );
  }
);
export default FormSelect;
