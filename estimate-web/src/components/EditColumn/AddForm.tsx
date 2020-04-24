import React from "react";
import styled from "styled-components";
import LabeledTextInput from "../shared/LabeledTextInput";
import { CreateTransactionMutationParam } from "../../types/types";
import { useForm } from "react-hook-form";

interface Props {
  accountId: string;
  createTransaction: ({
    variables: { date, value, description, accountId },
  }: CreateTransactionMutationParam) => void;
}

const Step = styled.div`
  border-bottom: 1px solid black;
  padding: 10px 0px;
`;

const SubmitButton = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
`;

const AddForm = ({
  accountId,
  createTransaction,
}: Props) => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = handleSubmit(
    async ({ date, value, description }) => {
      const result = await createTransaction({
        variables: {
          date,
          value,
          description,
          accountId,
        },
      });
      console.log({ result });
    }
  );

  return (
    <form onSubmit={onSubmit}>
      <Step>
        <LabeledTextInput
          disabled={false}
          labelText="amount"
          name="value"
          type="number"
          passedInRef={register}
        />
        <LabeledTextInput
          disabled={false}
          labelText="date"
          name="date"
          type="text"
          passedInRef={register}
        />
        <LabeledTextInput
          disabled={false}
          labelText="description"
          name="description"
          type="text"
          passedInRef={register}
        />
      </Step>
      <SubmitButton type="submit" disabled={isSubmitting}>
        Add transaction
      </SubmitButton>
    </form>
  );
};

export default AddForm;
