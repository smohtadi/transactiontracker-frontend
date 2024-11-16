import AuthContext from "./AuthContext";
import * as authService from "../services/authService";
import { ICuser } from "../types";
import useLocalStorage from "../hooks/useLocalStorage";

type Props = {
  children?: React.ReactNode;
};
export function AuthProvider({ children }: Props) {
  const [user, setUser] = useLocalStorage<ICuser|null>("user", null);
  const login = async (username: string, password: string) => {
    authService.login(username, password).then(() => {
      authService.me().then(cUser => setUser(cUser));
    });
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
