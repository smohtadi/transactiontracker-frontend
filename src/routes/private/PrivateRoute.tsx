import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { siteRoutes } from "../router";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? children : <Navigate to={siteRoutes.login.path} />;
}

// const location = useLocation();
// <Navigate to={`/login?redirect=${encodeURIComponent(redirect || location.pathname)}`} />
