import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { AuthContextProps } from "../types/auth.types.";
import Loading from "../components/custom/Loading";

function AuthContext({children, requireAuth}: AuthContextProps) {

    const { isSignedIn, isLoaded } = useAuth();

    switch (true) {
        case !isLoaded:
            return <Loading />;
        case requireAuth && !isSignedIn:
            return <Navigate to="/" />;
        case !requireAuth && isSignedIn:
            return <Navigate to="/home" />;
        default:
            break;
    }

    return (
        <>{children}</>
    )
}

export default AuthContext;