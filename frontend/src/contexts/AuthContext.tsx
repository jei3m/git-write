import { AuthContextProps } from "../types/auth.types.";
import { UserAuth } from "./FirebaseContext";
import { Navigate } from "react-router-dom";

function AuthContext({children, requireAuth}: AuthContextProps) {
    const { currentUser, logOut } = UserAuth();

    if (requireAuth && !currentUser) {
        return <Navigate to="/" />;
    } else if (!requireAuth && currentUser) {
        return <Navigate to="/home" />;
    }

    if (currentUser?.stsTokenManager.isExpired) {
        logOut();
    }

    return (
        <>{children}</>
    )
}

export default AuthContext;