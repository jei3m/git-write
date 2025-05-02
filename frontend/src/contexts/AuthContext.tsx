import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { AuthContextProps } from "../types/AuthContextProps";
import Loading from "../components/custom/Loading";

function AuthContext({children, requireAuth}: AuthContextProps) {

    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return <Loading/>
    }

    if (requireAuth && !isSignedIn) {
        return <Navigate to="/" />;
    }

    if (!requireAuth && isSignedIn) {
        return <Navigate to="/home" />;
    }

    return (
        <>{children}</>
    )
}

export default AuthContext;