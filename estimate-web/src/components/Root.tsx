import gql from "graphql-tag";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setSession } from "../store/ducks/session";
import { useQuery } from "react-apollo";
import Dashboard from "./Dashboard";

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
      dispatch(setSession(userSessionData));
    }
  }, [userSessionData]);

  if (userSessionError)
    return <div>user session error</div>;
  if (userSessionLoading)
    return <div>user session loading...</div>;

  return (
    <Dashboard
      userId={userSessionData.userSession.user.id}
    />
  );
};

export default Root;
