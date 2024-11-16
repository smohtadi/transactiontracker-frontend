import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { siteRoutes } from "../router";

export default function PublicRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  return user ? <Navigate to={siteRoutes.home.path} /> : children;
}
