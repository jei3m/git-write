import { decryptData } from "./encrypt";

export function getGithubToken() {
    const ENCRYPT_KEY = import.meta.env.VITE_ENCRYPT_KEY;
    const encryptedToken = localStorage.getItem("githubAccessToken");
    const decryptedToken = encryptedToken? decryptData(encryptedToken, ENCRYPT_KEY) : null; 

    return decryptedToken;
}