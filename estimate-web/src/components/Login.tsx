import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { get } from "lodash";

import { setSession } from "../store/ducks/session";
import LabeledTextInput from "./shared/LabeledTextInput";

const OrSignUp = styled.span`
  font-size: 0.9rem;
`;
const LoginButton = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
`;

export const createUserSessionMutation = gql`
  mutation($email: String!, $password: String!) {
    createUserSession(email: $email, password: $password) {
      id
      user {
        email
        id
      }
    }
  }
`;

interface Props {
  changeToSignUp: () => void;
}

const Login = ({ changeToSignUp }: Props) => {
  const [createUserSession] = useMutation(
    createUserSessionMutation
  );
  const dispatch = useDispatch();
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = handleSubmit(
    async ({ email, password }) => {
      const result = await createUserSession({
        variables: { email, password },
      });
      if (get(result, "data.createUserSession.id")) {
        dispatch(setSession(result.data.createUserSession));
      }
    }
  );

  return (
    <form onSubmit={onSubmit}>
      <LabeledTextInput
        labelText="Email"
        disabled={isSubmitting}
        name="email"
        type="email"
        passedInRef={register}
      />
      <LabeledTextInput
        labelText="Password"
        disabled={isSubmitting}
        name="password"
        type="password"
        passedInRef={register}
      />
      <LoginButton type="submit" disabled={isSubmitting}>
        Login
      </LoginButton>{" "}
      <OrSignUp>
        or{" "}
        <a
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
            changeToSignUp();
          }}
        >
          Sign Up
        </a>
      </OrSignUp>
    </form>
  );
};

export default Login;
