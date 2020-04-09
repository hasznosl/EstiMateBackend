import React from "react";
import { useSelector } from "react-redux";

import Login from "./login/Login";

const AccountDetails = () => {
  const session = useSelector((state) => state.session);
  console.log({ session });
  return session ? "Account" : <Login />;
};

export default AccountDetails;
