import { 
  Navigate, 
  Outlet 
} from "react-router-dom";
import { useAuth } from "../../stores";

function ProtectedRoute() {
  const auth = useAuth();

  return (
    auth.auth
      ? <Outlet/>
      : <Navigate to="/"/>
  )
}

export default ProtectedRoute
