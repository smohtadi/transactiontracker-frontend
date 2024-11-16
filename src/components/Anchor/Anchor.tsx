import { forwardRef } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { IProps } from "../../react-types";

interface Props extends IProps<HTMLAnchorElement> {
  btn?: boolean;
  href: string;
  variant?: "primary";
}

const Anchor = forwardRef<HTMLAnchorElement, Props>(
  ({ btn = false, className, children, href, variant, ...props }, ref) => {
    return (
      <Link
        {...props}
        ref={ref}
        className={classNames(
          "a",
          btn && "btn",
          btn && variant && `btn-${variant}`,
          className
        )}
        to={href}
      >
        {children}
      </Link>
    );
  }
);

export default Anchor;
