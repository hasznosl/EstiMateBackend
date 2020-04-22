import React, { useState } from "react";
import styled from "styled-components";
import LabeledTextInput, {
  LabelText,
} from "../shared/LabeledTextInput";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";

const BlackRadio = withStyles({
  root: {
    color: "black",
    "&$checked": {
      color: "black",
    },
  },
  checked: {},
})((props: RadioProps) => (
  <Radio color="default" {...props} />
));

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 400px;
  border: 1px solid black;
`;

const Title = styled.strong`
  border-bottom: 1px solid black;
  padding: 10px 0px;
  font-size: 0.9rem;
`;

const Step = styled.div`
  border-bottom: 1px solid black;
  padding: 10px 0px;
`;

const SubmitButton = styled.button`
  display: inline-block;
  margin-top: 0.5rem;
`;

interface Props {
  account: Account | null;
}

export const createTransactionMutation = gql`
  mutation(
    $accountId: String!
    $date: Date!
    $value: String!
    $description: String!
  ) {
    createAccountTransaction(
      accountId: $accountId
      date: $date
      value: $value
      description: $description
    ) {
      id
      value
      date
    }
  }
`;

const EditColumn = ({ account }: Props) => {
  const [manner, setManner] = useState<"adjust" | "add">(
    "adjust"
  );
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm();

  const [createTransaction] = useMutation(
    createTransactionMutation
  );

  const onSubmit = handleSubmit(
    async ({ date, value, dontincludethis }) => {
      console.log({ date, value, dontincludethis });

      const result = await createTransaction({
        variables: {
          date,
          value,
          description: "inline for now",
          accountId: account.id,
        },
      });
      console.log({ result });
    }
  );

  const handleMannerClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setManner(event.target.value as "adjust" | "add");
  };

  return account ? (
    <Container>
      <Title>Add a transaction to {account.name}</Title>
      <Step>
        <FormControl component="fieldset">
          <LabelText>Kind</LabelText>
          <RadioGroup
            aria-label="kind"
            name="manner"
            value={manner}
            onChange={handleMannerClick}
          >
            <FormControlLabel
              value="adjust"
              control={<BlackRadio />}
              label="Adjust"
            />
            <FormControlLabel
              value="add"
              control={<BlackRadio />}
              label="Add"
            />
          </RadioGroup>
        </FormControl>
      </Step>
      <form onSubmit={onSubmit}>
        <Step>
          <LabeledTextInput
            disabled={false}
            labelText={
              manner === "adjust" ? "adjust to" : "amount"
            }
            name="value"
            type="number"
            passedInRef={register}
          />
          {manner === "adjust" ? (
            <>
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
            </>
          ) : (
            <LabeledTextInput
              disabled={false}
              labelText="date"
              name="date"
              type="text"
              passedInRef={register}
            />
          )}
        </Step>

        <SubmitButton type="submit" disabled={isSubmitting}>
          Create
        </SubmitButton>
      </form>
    </Container>
  ) : (
    <Container />
  );
};

export default EditColumn;
