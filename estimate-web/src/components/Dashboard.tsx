import React, { useState } from "react";
import styled from "styled-components";
import EditColumn from "./EditColumn/EditColumn";
import AccountsTransactionsGraph from "./AccountsTransactionsGraph/AccountsTransactionsGraph";
import AccountDetails from "./AccountDetails";
import AccountsTransactionsTable from "./AccountsTransactionsTable/AccountsTransactionsTable";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

interface Props {
  userId: string;
}

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  width: 100%;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 1rem;
  width: 100%;
  background-color: ${(props) => props.theme.background};
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  flex: 1;
  margin-right: 1rem;
`;

const Sidebar = styled.div`
  flex: 0 auto;
  width: 10rem;
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
    <Wrapper>
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
        <Sidebar>
          <AccountDetails />
        </Sidebar>
      </Container>
    </Wrapper>
  );
};

export default Dashboard;
