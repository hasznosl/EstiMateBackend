import React from "react";
import { Account } from "../../types/types";
import styled from "styled-components";
import { createSummedTransactionsFromTransactions } from "../../legacyCode/createSummedTransactionsFromTransactions";
import { Line } from "react-chartjs-2";
import { isFirstDayOfMonth } from "date-fns";

interface Props {
  accounts: Account[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  flex-shrink: 3;
`;

const AccountsTransactionsGraph = ({ accounts }: Props) => {
  const summedTransactions = createSummedTransactionsFromTransactions(
    { accounts }
  );

  const xCoordinates = Object.keys(
    summedTransactions
  ).filter((date) => isFirstDayOfMonth(new Date(date)));

  const yCoordinates = xCoordinates.map(
    (date) => summedTransactions[date]
  );

  return (
    <Container>
      <Line
        data={{
          labels: xCoordinates,
          datasets: [
            { data: yCoordinates, label: "aggregate" },
          ],
        }}
      />
    </Container>
  );
};

export default AccountsTransactionsGraph;
