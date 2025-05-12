import { AuthContextProps } from "../types/auth.types.";
import { UserAuth } from "./FirebaseContext";
import { Navigate } from "react-router-dom";

function AuthContext({children, requireAuth}: AuthContextProps) {
    const { currentUser } = UserAuth();

    switch (true) {
        case requireAuth && !currentUser:
            return <Navigate to="/" />;
        case !requireAuth && currentUser:
            return <Navigate to="/home" />;
        default:
            break;
    }

    return (
        <>{children}</>
    )
}

export default AuthContext;