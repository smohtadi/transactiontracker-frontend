import { forwardRef } from "react";
import classNames from "classnames";
import { IPropsAndAs } from "../../react-types";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";

const Card = forwardRef<HTMLElement, IPropsAndAs>(
  ({ as: Component = "div", children, className, ...props }, ref) => {
    return (
      <Component {...props} ref={ref} className={classNames("card", className)}>
        {children}
      </Component>
    );
  }
);

const CCard = Object.assign(Card, {
  Body: CardBody,
  Footer: CardFooter,
  Header: CardHeader,
});

export default CCard;
