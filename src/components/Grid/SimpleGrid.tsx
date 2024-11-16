import classNames from "classnames";
import { forwardRef } from "react";
import { IPropsAndAs } from "../../react-types";

interface Props extends IPropsAndAs{
    cols: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
}

const SimpleGrid = forwardRef<HTMLElement, Props>(
  (
    { as: Component = "div", children, className, cols, sm, md, lg, xl, ...props },
    ref
  ) => {
    return (
      <Component
      {...props}
        ref={ref}
        className={classNames(
          "simple-grid",
          cols && `grid-cols-${cols}`,
          sm && `grid-cols-sm-${sm}`,
          md && `grid-cols-md-${md}`,
          lg && `grid-cols-lg-${lg}`,
          xl && `grid-cols-xl-${xl}`,
          className
        )}
      >
        {children}
      </Component>
    );
  }
);

export default SimpleGrid;