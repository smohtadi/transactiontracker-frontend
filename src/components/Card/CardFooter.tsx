import classNames from "classnames";
import { IPropsAndAs } from "../../react-types";
import { forwardRef } from "react";

const CardFooter = forwardRef<HTMLElement, IPropsAndAs>(
  ({ className, children, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames("card-footer", className)}
      >
        {children}
      </Component>
    );
  }
);

export default CardFooter;
