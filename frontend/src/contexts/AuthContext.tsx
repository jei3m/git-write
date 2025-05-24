import { AuthContextProps } from "../types/auth.types.";
import { UserAuth } from "./FirebaseContext";
import { Navigate } from "react-router-dom";
import { getGithubToken } from "@/utils/github-token";

function AuthContext({children, requireAuth}: AuthContextProps) {
    const { currentUser, logOut } = UserAuth();
    const token = getGithubToken();

    if (requireAuth && !currentUser) {
        return <Navigate to="/" />;
    } else if (!requireAuth && currentUser) {
        return <Navigate to="/home" />;
    }

    if (location.pathname != "/") {
        if ((currentUser as any)?.stsTokenManager.isExpired || !token) {
            logOut();
        }
    }

    return (
        <>{children}</>
    )
}

export default AuthContext;