import classNames from "classnames";
import { IProps } from "../../react-types";
import ListItem from "./ListItem";
import { forwardRef } from "react";

const UList = forwardRef<HTMLUListElement, IProps<HTMLUListElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul {...props} ref={ref} className={classNames("ul", className)}>
        {children}
      </ul>
    );
  }
);
const CUList = Object.assign(UList, {
  Item: ListItem,
});
export default CUList;
