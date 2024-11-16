import { forwardRef } from "react";
import { IProps } from "../../react-types";
import { Form } from "../Form/Form";

interface IColumn {
    key: string;
    text: string;
    width: string;
}

const Table = forwardRef<HTMLElement, IProps>(
  ({ columns, rows, checkboxSelection }) => {
    return (
      <div
        aria-colcount={columns.length}
        aria-rowcount={rows.length}
        aria-multiselectable={checkboxSelection}
        className="table"
        role="table"
      >
        <div className="table-header">
          <div className="table-head" aria-rowindex={1} role="row">
            {checkboxSelection && (
              <div
                className="table-header"
                role="columnheader"
                aria-colindex={1}
                aria-sort="none"
                style={{}}
              >
                <Form.Check aria-label="Select all rows" />
                <span className="table-header-separator"></span>
              </div>
            )}
            {columns.map((c, i) => (
              <div
                aria-colindex={checkboxSelection ? i + 2 : i + 1}
                aria-sort="none"
                className="table-header"
                key={c.key}
                role="columnheader"
                style={{ width: c.width }}
              >
                <span className="table-header-label">{c.text}</span>
                <span
                  aria-hidden={true}
                  className="table-header-separator"
                ></span>
              </div>
            ))}
          </div>
        </div>

        <div className="table-body" role="rowgroup">
            {rows.map((r, i) => (
          <div
            key={r.key}
            aria-rowindex={2}
            aria-selected={false}
            className="table-row"
            role="row"
          >
            { checkboxSelection && (<div className="table-data" role="grid-cell" aria-colindex={1} aria-colspan={1} aria-rowspan={1}>
                <Form.Check aria-label="Select row" />
          </div>) }
                { Object.keys(r).map((k, j) => (
                    
                ))}

            
          ))}
        </div>
      </div>
    );
  }
);
