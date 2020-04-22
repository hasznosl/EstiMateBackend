import gql from "graphql-tag";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import graphqlClient from "../api/graphqlClient";
import {
  setSession,
  Session,
} from "../store/ducks/session";
import AccountDetails from "./AccountDetails";
import AccountsTransactionsTable from "./AccountsTransactionsTable/AccountsTransactionsTable";
import AccountsTransactionsGraph from "./AccountsTransactionsGraph/AccountsTransactionsGraph";
import EditColumn from "./AccountsTransactionsTable/EditColumn";
import { DefaultRootStore } from "../store/ducks";

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

const getUserSessionQuery = gql`
  {
    userSession(me: true) {
      id
      user {
        email
        id
      }
    }
  }
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

const Root = () => {
  const dispatch = useDispatch();
  const session = useSelector<DefaultRootStore, Session>(
    (state) => state.session
  );

  const [initialized, setInitialized] = useState(false);
  const [accounts, setAccounts] = useState(null);
  const [clickedAccount, setClickedAccount] = useState(
    null
  );

  useEffect(() => {
    graphqlClient
      .query({ query: getUserSessionQuery })
      .then(({ data }) => {
        if (data.userSession) {
          dispatch(setSession(data.userSession));
        }
        setInitialized(true);
      });
  }, []);

  useEffect(() => {
    if (session && session.user) {
      graphqlClient
        .query({
          query: getAccountsQuery,
          variables: { userId: session.user.id },
        })
        .then(({ data }) => {
          if (data.userAccounts) {
            setAccounts(data.userAccounts);
          }
        });
    }
  }, [session]);

  if (!initialized) return "Loading...";

  return (
    <Wrapper>
      <Container>
        <Content>
          <EditColumn account={clickedAccount} />
          <AccountsTransactionsTable
            accounts={accounts}
            setClickedAccount={setClickedAccount}
            clickedAccount={clickedAccount}
          />
          <AccountsTransactionsGraph accounts={accounts} />
        </Content>
        <Sidebar>
          <AccountDetails />
        </Sidebar>
      </Container>
    </Wrapper>
  );
};

export default Root;
