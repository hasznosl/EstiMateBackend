import React, { useState } from "react";
import styled from "styled-components";
import LabeledTextInput from "../shared/LabeledTextInput";
import { useForm } from "react-hook-form";
import { CreateTransactionMutationParam } from "../../types/types";

const Step = styled.div`
  border-bottom: 1px solid black;
  padding: 10px 0px;
`;

const SubmitButton = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
`;

interface Props {
  accountId: string;
  createTransaction: ({
    variables: { date, value, description, accountId },
  }: CreateTransactionMutationParam) => void;
}

const AdjustForm = ({
  createTransaction,
  accountId,
}: Props) => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm();
  const [value, setValue] = useState<string>("");

  const onSubmit = handleSubmit(
    async ({ date, value, description }) => {
      await createTransaction({
        variables: {
          date,
          value,
          description,
          accountId,
        },
      });
    }
  );

  return (
    <form onSubmit={onSubmit}>
      <Step>
        <LabeledTextInput
          disabled={false}
          labelText="adjust to"
          name="value"
          type="number"
          passedInRef={register}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <LabeledTextInput
          disabled={true}
          labelText="date"
          name="dontincludethis"
          type="text"
          value="today"
        />
        <LabeledTextInput
          hidden
          disabled={true}
          labelText="date"
          name="date"
          type="text"
          passedInRef={register}
          value={new Date().toString()}
        />
        <LabeledTextInput
          hidden
          disabled={true}
          labelText="description"
          name="description"
          type="text"
          passedInRef={register}
          value={`Adjusting to ${value}`}
        />
      </Step>
      <SubmitButton type="submit" disabled={isSubmitting}>
        Adjust balance
      </SubmitButton>
    </form>
  );
};

export default AdjustForm;
