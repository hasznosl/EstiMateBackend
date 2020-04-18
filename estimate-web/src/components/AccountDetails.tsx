import React, { useState } from "react";
import { useSelector } from "react-redux";

import Login from "./Login";
import Account from "./Account";
import Signup from "./SignUp";
import { DefaultRootStore } from "../store/ducks";
import { Session } from "../store/ducks/session";

const AccountDetails = () => {
  const session = useSelector<DefaultRootStore, Session>(
    (state) => state.session
  );
  const [isSigningUp, setIsSigningUp] = useState(false);

  return session ? (
    <Account />
  ) : isSigningUp ? (
    <Signup changeToLogIn={() => setIsSigningUp(false)} />
  ) : (
    <Login changeToSignUp={() => setIsSigningUp(true)} />
  );
};

export default AccountDetails;
