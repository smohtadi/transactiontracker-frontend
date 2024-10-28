import { Link } from "react-router-dom";
import "./table.css";
type ITableProps = {
  items: IItem[];
};
interface IItem {
  amount: number;
  category: string;
  date: string;
  description: string;
  id: string;
}
const SEL_WIDTH = 48,
  DESC_WIDTH = 400,
  COL_WIDTH = 160;
export default function Table({ items }: ITableProps) {
  return (
    <div
      aria-colcount={4}
      aria-rowcount={items.length}
      className="table"
      role="table"
    >
      <div className="table-header-row" role="row">
        <div
          className="table-header-cell table-header-select"
          role="columnheader"
          style={{ minWidth: `${SEL_WIDTH}px` }}
        >
          <input aria-label="Toggle selection for all items" type="checkbox" />
        </div>
        <div
          className="table-header-cell"
          role="columnheader"
          style={{ minWidth: `${DESC_WIDTH}px` }}
        >
          <span className="table-header-title">Description</span>
        </div>
        <div
          className="table-header-cell"
          role="columnheader"
          style={{ minWidth: `${COL_WIDTH}px` }}
        >
          <span className="table-header-title">Category</span>
        </div>
        <div
          className="table-header-cell"
          role="columnheader"
          style={{ minWidth: `${COL_WIDTH}px` }}
        >
          <span className="table-header-title">Amount</span>
        </div>
        <div
          className="table-header-cell"
          role="columnheader"
          style={{ minWidth: `${COL_WIDTH}px` }}
        >
          <span className="table-header-title">Date</span>
        </div>
      </div>

      {items.map((item) => (
        <div className="table-body-row" key={item.id} role="row">
          <div
            className="table-body-cell table-body-select"
            role="cell"
            style={{ minWidth: `${SEL_WIDTH}px` }}
          >
            <input type="checkbox" name="1" />
          </div>
          <div
            className="table-body-cell"
            role="cell"
            style={{ minWidth: `${DESC_WIDTH}px` }}
          >
            <Link to="">{item.description}</Link>
          </div>
          <div
            className="table-body-cell"
            role="cell"
            style={{ minWidth: `${COL_WIDTH}px` }}
          >
            <span>{item.category}</span>
          </div>
          <div
            className="table-body-cell"
            role="cell"
            style={{ minWidth: `${COL_WIDTH}px` }}
          >
            <span>{item.amount}</span>
          </div>
          <div
            className="table-body-cell"
            role="cell"
            style={{ minWidth: `${COL_WIDTH}px` }}
          >
            <span>{item.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
