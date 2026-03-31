import React, { createContext } from "react";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
});

export default AuthContext;
export { AuthContext };
