import { forwardRef } from "react";
import classNames from "classnames";
import { IProps } from "../../react-types";

interface Props extends IProps<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  variant?: "primary";
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, children, type = "button", variant, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={classNames("btn", variant && `btn-${variant}`, className)}
        type={type}
      >
        {children}
      </button>
    );
  }
);
export default Button;
