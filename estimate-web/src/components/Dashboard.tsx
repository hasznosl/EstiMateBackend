import React, { useState } from "react";
import styled from "styled-components";
import EditColumn from "./EditColumn/EditColumn";
import AccountsTransactionsGraph from "./AccountsTransactionsGraph/AccountsTransactionsGraph";
import AccountsTransactionsTable from "./AccountsTransactionsTable/AccountsTransactionsTable";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

interface Props {
  userId: string;
}

const Container = styled.div`
  display: flex;
  flex-grow: 8;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex: 1;
  margin-right: 1rem;
`;

const getAccountsQuery = gql`
  query($userId: ID!) {
    userAccounts(userId: $userId) {
      id
      name
      currency
      transactions {
        date
        value
        description
      }
    }
  }
`;

const Dashboard = ({ userId }: Props) => {
  const [clickedAccount, setClickedAccount] = useState(
    null
  );
  const {
    loading: accountsLoading,
    error: accountsError,
    data: accountsData,
  } = useQuery(getAccountsQuery, {
    variables: { userId },
  });

  if (accountsLoading) return <div>Loading accounts</div>;
  if (accountsError) return <div>Accounts error</div>;

  return (
    <Container>
      <Content>
        <EditColumn
          account={clickedAccount}
          getAccountsQuery={getAccountsQuery}
          userId={userId}
        />
        <AccountsTransactionsTable
          accounts={accountsData.userAccounts}
          setClickedAccount={setClickedAccount}
          clickedAccount={clickedAccount}
        />
        <AccountsTransactionsGraph
          accounts={accountsData.userAccounts}
        />
      </Content>
    </Container>
  );
};

export default Dashboard;
