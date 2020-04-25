import React from "react";
import { Account } from "../../types/types";
import styled from "styled-components";
import { createSummedTransactionsFromTransactions } from "../../legacyCode/createSummedTransactionsFromTransactions";

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

  return (
    <Container>
      <div>Graph will come here</div>
      {Object.keys(summedTransactions).map(
        // temporarily ok
        (date, index) => (
          <div key={index}>
            {date} - {summedTransactions[date]}
          </div>
        )
      )}
    </Container>
  );
};

export default AccountsTransactionsGraph;
