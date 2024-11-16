import classNames from "classnames";
import { IProps } from "../../react-types";
import { forwardRef } from "react";

const H1 = forwardRef<HTMLHeadingElement, IProps<HTMLHeadingElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <h1 {...props} ref={ref} className={classNames("h1", className)}>
        {children}
      </h1>
    );
  }
);

const H2 = forwardRef<HTMLHeadingElement, IProps<HTMLHeadingElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <h2 {...props} ref={ref} className={classNames(className, "h2")}>
        {children}
      </h2>
    );
  }
);

const H3 = forwardRef<HTMLHeadingElement, IProps<HTMLHeadingElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <h3 {...props} ref={ref} className={classNames(className, "h3")}>
        {children}
      </h3>
    );
  }
);

const H4 = forwardRef<HTMLHeadingElement, IProps<HTMLHeadingElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <h4 {...props} ref={ref} className={classNames(className, "h4")}>
        {children}
      </h4>
    );
  }
);

const P = forwardRef<HTMLParagraphElement, IProps<HTMLParagraphElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <p {...props} ref={ref} className={classNames(className, "p")}>
        {children}
      </p>
    );
  }
);

const Span = forwardRef<HTMLSpanElement, IProps<HTMLSpanElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <span {...props} ref={ref} className={classNames(className, "span")}>
        {children}
      </span>
    );
  }
);

function Text() {
  return <></>;
}

const CText = Object.assign(Text, {
  H1: H1,
  H2: H2,
  H3: H3,
  H4: H4,
  P: P,
  Span: Span,
});

export default CText;
