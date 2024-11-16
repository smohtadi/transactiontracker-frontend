import { forwardRef } from "react";
import classNames from "classnames";
import { IPropsAndAs } from "../../react-types";

const CardBody = forwardRef<HTMLElement, IPropsAndAs>(
  ({ className, children, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames("card-body", className)}
      >
        {children}
      </Component>
    );
  }
);

export default CardBody;
