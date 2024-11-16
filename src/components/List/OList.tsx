import classNames from "classnames";
import { forwardRef } from "react";
import ListItem from "./ListItem";
import { IProps } from "../../react-types";

const OList = forwardRef<HTMLOListElement, IProps<HTMLOListElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <ol {...props} ref={ref} className={classNames("ol", className)}>
        {children}
      </ol>
    );
  }
);
const COList = Object.assign(OList, {
  Item: ListItem,
});
export default COList;
