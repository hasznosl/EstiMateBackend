import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { clearSession } from "../store/ducks/session";
import { DefaultRootStore } from "../store/ducks";
import { Session } from "../store/ducks/session";

const Email = styled.div`
  color: ${(props) => props.theme.nero};
  font-size: 1rem;
  margin-top: 0.25rem;
`;

const LogoutLink = styled.a.attrs({ href: "#" })`
  color: blue;
  display: block;
  margin-top: 0.25rem;
`;

const Container = styled.div`
  color: ${(props) => props.theme.mortar};
  font-size: 0.9rem;
`;

const deleteSessionMutation = gql`
  mutation($sessionId: ID!) {
    deleteUserSession(sessionId: $sessionId)
  }
`;

const Account = () => {
  const [deleteUserSession] = useMutation(
    deleteSessionMutation
  );
  const dispatch = useDispatch();
  const session = useSelector<DefaultRootStore, Session>(
    (state) => state.session
  );

  console.log({ session });

  return (
    <Container>
      Logged in as <Email>{session.user.email}</Email>
      <LogoutLink
        onClick={(evt) => {
          evt.preventDefault();
          dispatch(clearSession());
          deleteUserSession({
            variables: { sessionId: session.id },
          });
        }}
      >
        (Logout)
      </LogoutLink>
    </Container>
  );
};

export default Account;
