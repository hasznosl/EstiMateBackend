import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const Label = styled.label`
  display: block;

  :not(:first-child) {
    margin-top: 0.75rem;
  }
`;

const LabelText = styled.strong`
display: block
font-size: .9rem;
margin-bottom: .25rem;
`;

const Login = () => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = () => {};

  return (
    <form onSubmit={onSubmit}>
      <Label>
        <LabelText>Email</LabelText>
        login
      </Label>
    </form>
  );
};

export default Login;
