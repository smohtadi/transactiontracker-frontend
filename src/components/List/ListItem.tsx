import classNames from "classnames";
import { IProps } from "../../react-types";
import { forwardRef } from "react";

const ListItem = forwardRef<HTMLLIElement, IProps<HTMLLIElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <li {...props} ref={ref} className={classNames("li", className)}>
        {children}
      </li>
    );
  }
);
export default ListItem;
