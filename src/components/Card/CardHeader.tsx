import { forwardRef } from "react";
import classNames from "classnames";
import { IPropsAndAs } from "../../react-types";

const CardHeader = forwardRef<HTMLElement, IPropsAndAs>(
  ({ as: Component = "div", className, children, ...props }, ref) => {
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames("card-header", className)}
      >
        {children}
      </Component>
    );
  }
);

export default CardHeader;
