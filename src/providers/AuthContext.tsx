import { createContext } from "react";
import { IAuthContext } from "../types";

const AuthContext = createContext<IAuthContext>({
  user: null,
  login: async () => {},
  logout: () => {},
});
export default AuthContext;
