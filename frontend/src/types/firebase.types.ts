export interface AuthContextType {
    currentUser: any;
    signInWithGitHub: () => Promise<any>;
    logOut: () => Promise<void>;
}