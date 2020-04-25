import gql from "graphql-tag";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setSession } from "../store/ducks/session";
import { useQuery } from "react-apollo";
import Dashboard from "./Dashboard";
import AccountDetails from "./AccountDetails";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  height: 100%;
  padding: 1rem;
  width: 100%;
  background-color: ${(props) => props.theme.background};
`;

const Sidebar = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
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

const Root = () => {
  const dispatch = useDispatch();

  const {
    loading: userSessionLoading,
    error: userSessionError,
    data: userSessionData,
  } = useQuery(getUserSessionQuery);

  useEffect(() => {
    if (userSessionData) {
      console.log({ userSessionData });
      dispatch(setSession(userSessionData.userSession));
    }
  }, [userSessionData]);

  if (userSessionError)
    return <div>user session error</div>;
  if (userSessionLoading)
    return <div>user session loading...</div>;

  console.log({ userSessionData });
  return (
    <Wrapper>
      {userSessionData && userSessionData.userSession && (
        <Dashboard
          userId={userSessionData.userSession.user.id}
        />
      )}
      <Sidebar>
        <AccountDetails />
      </Sidebar>
    </Wrapper>
  );
};

export default Root;
