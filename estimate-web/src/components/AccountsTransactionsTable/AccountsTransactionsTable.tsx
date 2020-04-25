import React from "react";
import { Account } from "../../types/types";
import "react-virtualized/styles.css";
import {
  Column,
  Table,
  TableHeaderProps,
} from "react-virtualized";
import styled from "styled-components";
interface Props {
  accounts: Account[];
  setClickedAccount: (account: Account) => void;
  clickedAccount: Account;
}

interface Row {
  accountId: string;
  name: string;
  currency: string;
  value: string;
  date: Date;
  description: string;
}

const TOTAL_WIDTH = 1000;
const widths = {
  description: 0.3,
  currency: 0.15,
  name: 0.2,
  value: 0.15,
  date: 0.2,
};

const Container: any = styled.div`
  flex-grow: 2;
  flex-shrink: 2;
`;

const AccountCell: any = styled.div`
  cursor: pointer;
  background-color: ${(props: any) =>
    props.active ? props.theme.veryLightGrey : ""};
`;

const AccountsTransactionsTable = ({
  accounts,
  setClickedAccount,
  clickedAccount,
}: Props) => {
  const headerRenderer = ({
    dataKey,
    label,
  }: TableHeaderProps) => (
    <div
      className="ReactVirtualized__Table__headerTruncatedText"
      key={dataKey}
    >
      {label}
    </div>
  );

  // performance concerns later
  const lines: Row[] = accounts
    ? accounts
        .map((account) => ({
          accountId: account.id,
          currency: account.currency,
          name: account.name,
          transactions: account.transactions,
        }))
        .reduce(
          (accumulatorArray: Row[], accountObject) => [
            ...accumulatorArray,
            ...accountObject.transactions.map(
              (transaction) => ({
                accountId: accountObject.accountId,
                currency: accountObject.currency,
                name: accountObject.name,
                date: transaction.date,
                value: transaction.value,
                description: transaction.description,
              })
            ),
          ],
          []
        )
    : [];

  return (
    <Container>
      {accounts && accounts.length > 0 ? (
        <Table
          width={TOTAL_WIDTH}
          height={1000}
          headerHeight={20}
          rowHeight={30}
          rowCount={lines.length}
          rowGetter={({ index }) => lines[index]}
        >
          <Column
            headerRenderer={headerRenderer}
            dataKey="name"
            label="Account"
            width={widths.name * TOTAL_WIDTH}
            cellRenderer={({
              rowData,
            }: {
              rowData: Row;
            }) => (
              <AccountCell
                active={
                  clickedAccount &&
                  clickedAccount.id === rowData.accountId
                }
                onClick={(e: any) => {
                  e.stopPropagation();
                  setClickedAccount(
                    clickedAccount &&
                      clickedAccount.id ===
                        rowData.accountId
                      ? null
                      : accounts.find(
                          (account) =>
                            account.id === rowData.accountId
                        )
                  );
                }}
              >
                {rowData.name}
              </AccountCell>
            )}
          />
          <Column
            dataKey="currency"
            label="Currency"
            width={widths.currency * TOTAL_WIDTH}
          />
          <Column
            headerRenderer={headerRenderer}
            dataKey="value"
            label="Amount"
            width={widths.value * TOTAL_WIDTH}
          />
          <Column
            headerRenderer={headerRenderer}
            dataKey="date"
            label="Date"
            width={widths.date * TOTAL_WIDTH}
            cellRenderer={({ cellData }) =>
              cellData.split("T")[0].split("-").join(" ")
            }
          />
          <Column
            headerRenderer={headerRenderer}
            dataKey="description"
            label="Description"
            width={widths.description * TOTAL_WIDTH}
          />
        </Table>
      ) : (
        <div>No Data</div>
      )}
    </Container>
  );
};

export default AccountsTransactionsTable;
