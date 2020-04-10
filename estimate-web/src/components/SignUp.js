import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { get } from "lodash";
import * as yup from "yup";

import { setSession } from "#root/store/ducks/session";
import TextInput from "#root/components/shared/TextInput";
import { createUserSessionMutation } from "./Login";

const Label = styled.label`
  display: block;

  :not(:first-child) {
    margin-top: 0.75rem;
  }
`;

const OrLogin = styled.span`
  font-size: 0.9rem;
`;

const LabelText = styled.strong`
display: block
font-size: .9rem;
margin-bottom: .25rem;
`;

const SignUpButton = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
`;

const createUserMutation = gql`
  mutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
    }
  }
`;

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .test(
      "sameAsConfirmPassword",
      "${path} is not the same as the confirmation password.",
      function () {
        return (
          this.parent.password ===
          this.parent.confirmPassword
        );
      }
    ),
});

const SignUp = ({ changeToLogIn }) => {
  const [createUser] = useMutation(createUserMutation);
  const [createUserSession] = useMutation(
    createUserSessionMutation
  );
  const dispatch = useDispatch();
  const {
    formState: { isSubmitting, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm({ mode: "onChange", validationSchema });

  const onSubmit = handleSubmit(
    async ({ email, password }) => {
      const signUpResult = await createUser({
        variables: { email, password },
      });
      reset();
      if (get(signUpResult, "data.createUser.id")) {
        const logInResult = await createUserSession({
          variables: { email, password },
        });
        dispatch(
          setSession(logInResult.data.createUserSession)
        );
      }
    }
  );

  console.log({ isValid, isSubmitting });

  return (
    <form onSubmit={onSubmit}>
      <Label>
        <LabelText>Email</LabelText>
        <TextInput
          disabled={isSubmitting}
          name="email"
          type="email"
          ref={register}
        />
      </Label>
      <Label>
        <LabelText>Password</LabelText>
        <TextInput
          disabled={isSubmitting}
          name="password"
          type="password"
          ref={register}
        />
      </Label>
      <Label>
        <LabelText>Confirm Password</LabelText>
        <TextInput
          disabled={isSubmitting}
          name="confirmPassword"
          type="password"
          ref={register}
        />
      </Label>
      <SignUpButton
        type="submit"
        disabled={isSubmitting || !isValid}
      >
        Sign Up
      </SignUpButton>{" "}
      <OrLogin>
        or{" "}
        <a
          href="#"
          onClick={(evt) => {
            evt.preventDefault();
            changeToLogIn();
          }}
        >
          Login
        </a>
      </OrLogin>
    </form>
  );
};

export default SignUp;
