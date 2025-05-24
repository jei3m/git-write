import { User } from 'firebase/auth';

export interface GitHubSignInResponse {
    user: User;
    token: string | null;
}

export interface AuthContextType {
    currentUser: User | null;
    signInWithGitHub: () => Promise<GitHubSignInResponse>;
    logOut: () => Promise<void>;
}