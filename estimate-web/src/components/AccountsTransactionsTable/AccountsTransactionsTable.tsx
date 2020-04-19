import React from "react";
import { Account } from "../../types/types";
import "react-virtualized/styles.css";
import {
  Column,
  Table,
  TableHeaderProps,
} from "react-virtualized";
import Draggable from "react-draggable";

interface Props {
  accounts: Account[];
}

const TOTAL_WIDTH = 600;
const widths = {
  description: 0.33,
  currency: 0.33,
  name: 0.33,
};

const AccountsTransactionsTable = ({ accounts }: Props) => {
  const headerRenderer = ({
    dataKey,
    label,
  }: TableHeaderProps) => (
    <React.Fragment key={dataKey}>
      <div className="ReactVirtualized__Table__headerTruncatedText">
        {label}
      </div>
      <Draggable
        axis="x"
        defaultClassName="DragHandle"
        defaultClassNameDragging="DragHandleActive"
        onDrag={
          (event, { deltaX }) => {}
          // this.resizeRow({
          //   dataKey,
          //   deltaX,
          // })
        }
        position={{ x: 0, y: 0 }}
      >
        <span className="DragHandleIcon">⋮</span>
      </Draggable>
    </React.Fragment>
  );

  return accounts && accounts.length > 0 ? (
    <Table
      width={600}
      height={300}
      headerHeight={20}
      rowHeight={30}
      rowCount={accounts.length}
      rowGetter={({ index }) => accounts[index]}
    >
      <Column
        headerRenderer={headerRenderer}
        dataKey="name"
        label="Name"
        width={widths.name * TOTAL_WIDTH}
      />
      <Column
        headerRenderer={headerRenderer}
        dataKey="description"
        label="Description"
        width={widths.description * TOTAL_WIDTH}
      />
      <Column
        dataKey="currency"
        label="Currency"
        width={widths.currency * TOTAL_WIDTH}
      />
    </Table>
  ) : (
    <div>No Data</div>
  );
};

export default AccountsTransactionsTable;
