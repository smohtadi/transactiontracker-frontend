import { forwardRef } from "react";
import classNames from "classnames";
import { IProps } from "../../react-types";

const TableDataCell = forwardRef<
  HTMLTableDataCellElement,
  IProps<HTMLTableDataCellElement>
>(({ children, className, ...props }, ref) => {
  return (
    <td {...props} ref={ref} className={classNames("td", className)}>
      {children}
    </td>
  );
});

const TableRow = forwardRef<HTMLTableRowElement, IProps<HTMLTableRowElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <tr {...props} ref={ref} className={classNames("tr", className)}>
        {children}
      </tr>
    );
  }
);

const TableHeader = forwardRef<
  HTMLTableHeaderCellElement,
  IProps<HTMLTableHeaderCellElement>
>(({ children, className, ...props }, ref) => {
  return (
    <th {...props} ref={ref} className={classNames("th", className)}>
      {children}
    </th>
  );
});

const TableHead = forwardRef<
  HTMLTableSectionElement,
  IProps<HTMLTableSectionElement>
>(({ children, className, ...props }, ref) => {
  return (
    <thead {...props} ref={ref} className={classNames("thead", className)}>
      {children}
    </thead>
  );
});

const TableBody = forwardRef<
  HTMLTableSectionElement,
  IProps<HTMLTableSectionElement>
>(({ children, className, ...props }, ref) => {
  return (
    <tbody {...props} ref={ref} className={classNames("tbody", className)}>
      {children}
    </tbody>
  );
});

const Table = forwardRef<HTMLTableElement, IProps<HTMLTableElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <table {...props} ref={ref} className={classNames("table", className)}>
        {children}
      </table>
    );
  }
);

const CTable = Object.assign(Table, {
  Body: TableBody,
  Cell: TableDataCell,
  Head: TableHead,
  Header: TableHeader,
  Row: TableRow,
});

export default CTable;
