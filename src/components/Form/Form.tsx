import { forwardRef } from "react";
import classNames from "classnames";
import FormGroup from "./FormGroup";
import FormLabel from "./FormLabel";
import FormSelect from "./FormSelect";
import FormControl from "./FormControl";
import { IProps } from "../../react-types";
import FormCheckbox from "./FormCheckbox";

const Form = forwardRef<HTMLFormElement, IProps<HTMLFormElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <form {...props} ref={ref} className={classNames("form", className)}>
        {children}
      </form>
    );
  }
);
const CForm = Object.assign(Form, {
  Check: FormCheckbox,
  Control: FormControl,
  Group: FormGroup,
  Label: FormLabel,
  Select: FormSelect,
});
export default CForm;
