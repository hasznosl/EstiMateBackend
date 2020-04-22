import React from "react";
import styled from "styled-components";
import TextInput from "./TextInput";

const Label = styled.label`
  display: block;

  :not(:first-child) {
    margin-top: ${(props) =>
      props.hidden ? "0px" : "0.75rem"};
  }

  visibility: ${(props) =>
    props.hidden ? "collapse" : "visible"};

  height: ${(props) => (props.hidden ? "0px" : "auto")};
`;

export const LabelText = styled.strong`
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

interface Props {
  labelText: string;
  disabled: boolean;
  name: string;
  type: string;
  passedInRef?: any;
  value?: string;
  hidden?: boolean;
}

const LabeledTextInput = ({
  labelText,
  disabled,
  name,
  type,
  passedInRef,
  value,
  hidden,
}: Props) => (
  <Label hidden={hidden}>
    <LabelText>{labelText}</LabelText>
    <TextInput
      disabled={disabled}
      name={name}
      type={type}
      {...(passedInRef ? { ref: passedInRef } : {})}
      {...(value ? { value } : {})}
    />
  </Label>
);

export default LabeledTextInput;
