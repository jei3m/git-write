import Loading from "@/components/custom/Loading";
import { AuthContextProps } from "../types/auth.types.";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

function AuthContext({children, requireAuth}: AuthContextProps) {
    const { isAuthenticated, isLoading } = useAuth0();

    switch (true) {
        case isLoading:
            return <Loading/>; // Simple loading state
        case requireAuth && !isAuthenticated:
            return <Navigate to="/" />;
        case !requireAuth && isAuthenticated:
            return <Navigate to="/home" />;
        default:
            break;
    }

    return (
        <>{children}</>
    )
}

export default AuthContext;