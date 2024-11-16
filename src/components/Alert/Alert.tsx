import classNames from "classnames";
import { IPropsAndAs } from "../../react-types";
import { forwardRef } from "react";

const Alert = forwardRef<HTMLElement, IPropsAndAs>(
  ({ as: Component = "div", children, className, ...props }, ref) => {
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames("alert", className)}
      >
        {children}
      </Component>
    );
  }
);
export default Alert;
