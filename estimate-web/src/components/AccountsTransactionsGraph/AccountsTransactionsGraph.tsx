import React from "react";
import { Account } from "../../types/types";
import styled from "styled-components";

interface Props {
  accounts: Account[];
}

const Container = styled.div`
  flex-grow: 3;
  flex-shrink: 3;
`;

const AccountsTransactionsGraph = ({ accounts }: Props) => (
  <Container>Graph comes here</Container>
);

export default AccountsTransactionsGraph;
