import { forwardRef, useMemo } from "react";
import classNames from "classnames";
import { IPropsAndAs } from "../../react-types";
import FormContext from "./FormContext";

interface Props extends IPropsAndAs {
  controlId?: string;
}

const FormGroup = forwardRef<HTMLElement, Props>(
  (
    { as: Component = "div", children, className, controlId, ...props },
    ref
  ) => {
    const context = useMemo(() => controlId, [controlId]);
    return (
      <FormContext.Provider value={context}>
        <Component
          {...props}
          ref={ref}
          className={classNames("form-group", className)}
        >
          {children}
        </Component>
      </FormContext.Provider>
    );
  }
);
export default FormGroup;
