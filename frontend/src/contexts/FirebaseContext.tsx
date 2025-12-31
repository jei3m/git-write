import { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    GithubAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { auth } from '../firebase';
import Loading from '@/components/custom/Loading';
import { AuthContextType, GitHubSignInResponse } from '@/types/firebase.types';
import { encryptData } from '@/utils/encrypt';
const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: {children: ReactNode}) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const ENCRYPT_KEY = import.meta.env.VITE_ENCRYPT_KEY;

    // Sign in with GitHub
    async function signInWithGitHub(): Promise<GitHubSignInResponse> {
        const provider = new GithubAuthProvider()
        provider.addScope('public_repo');

        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken ?? null;
            
            // Encrypt token before storing
            const encryptedToken = encryptData(token, ENCRYPT_KEY)
            localStorage.setItem('githubAccessToken', encryptedToken);

            const user = result.user;
            setCurrentUser(user);
            window.location.reload();
            return { user, token };
        } catch (error: any) {
            console.error('Error signing in with GitHub:', error);
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData?.email;
            const credential = GithubAuthProvider.credentialFromError(error);
            
            throw { errorCode, errorMessage, email, credential };
        }
    }

    // Log out
    function logOut() {
        return signOut(auth).catch((error) => console.error('Error signing out:', error));
    }

    // Update context value to include the token
    const value = {
        currentUser,
        signInWithGitHub,
        logOut,
    };

    // Check user authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
}

// Access the AuthContext then throw an error if used outside the AuthProvider
function UserAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('UserAuth must be used within an AuthProvider');
    }
    return context;
}

export { AuthProvider, UserAuth };