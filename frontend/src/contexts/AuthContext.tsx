import { UserAuth } from "./FirebaseContext";
import { Navigate, useLocation } from "react-router-dom"; // Added useLocation
import { getGithubToken } from "@/utils/github-token";
import { useGithubStore } from "@/store/github.store";
import { useEffect, useState } from "react";
import { AuthContextProps } from "@/types/auth.types.";
import Loading from "@/components/custom/Loading";

function AuthContext({ children, requireAuth }: AuthContextProps) {
    const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null); 
    const [isChecking, setIsChecking] = useState(true);
    const { currentUser, logOut } = UserAuth();
    const token = getGithubToken();
    const { verifyToken } = useGithubStore();
    const location = useLocation();

    useEffect(() => {
        (async () => {
            setIsChecking(true);
            try {
                const { success } = await verifyToken();
                setIsTokenValid(success);
                
                // Check Firebase token expiration
                if (location.pathname !== "/") {
                    const isExpired = (currentUser as any)?.stsTokenManager?.isExpired;
                    if (isExpired || !token) {
                        logOut();
                    }
                }
            } catch (error) {
                console.error("Auth check error:", error);
                setIsTokenValid(false);
            } finally {
                setIsChecking(false);
            }
        })();
    }, [currentUser, token, location.pathname, verifyToken, logOut]);

    // Show loading while checking
    if (isChecking) {
        return <Loading />; // Or your custom loading component
    }

    // If still checking, show nothing
    if (isTokenValid === null) {
        return null;
    }

    // If auth is required but token is invalid
    if (requireAuth && (!currentUser || !isTokenValid)) {
        return <Navigate to="/" replace />;
    }

    // If auth is NOT required but user IS authenticated
    if (!requireAuth && currentUser && isTokenValid) {
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
}

export default AuthContext;