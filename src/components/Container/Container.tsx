import { forwardRef } from "react";
import classNames from "classnames";
import { IPropsAndAs } from "../../react-types";

const Container = forwardRef<HTMLElement, IPropsAndAs>(
  ({ as: Component = "div", children, className, ...props }, ref) => {
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames("container", className)}
      >
        {children}
      </Component>
    );
  }
);
export default Container;
