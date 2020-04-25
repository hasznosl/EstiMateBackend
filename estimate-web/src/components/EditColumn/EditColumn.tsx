import React, { useState } from "react";
import styled from "styled-components";
import { LabelText } from "../shared/LabeledTextInput";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import AdjustForm from "./AdjustForm";
import AddForm from "./AddForm";
import { DocumentNode } from "graphql";

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
  flex-grow: 1;
  flex-shrink: 1;
  flex-direction: column;
  width: 200px;
  height: 450px;
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

interface Props {
  account: Account | null;
  getAccountsQuery: DocumentNode;
  userId: string;
}

export const createTransactionMutation = gql`
  mutation(
    $accountId: ID!
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

const EditColumn = ({
  account,
  getAccountsQuery,
  userId,
}: Props) => {
  const [manner, setManner] = useState<"adjust" | "add">(
    "adjust"
  );

  const [createTransaction] = useMutation(
    createTransactionMutation,
    {
      refetchQueries: [
        { query: getAccountsQuery, variables: { userId } },
      ],
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
      {manner === "adjust" ? (
        <AdjustForm
          accountId={account.id}
          createTransaction={createTransaction}
        />
      ) : (
        <AddForm
          accountId={account.id}
          createTransaction={createTransaction}
        />
      )}
    </Container>
  ) : (
    <Container />
  );
};

export default EditColumn;
