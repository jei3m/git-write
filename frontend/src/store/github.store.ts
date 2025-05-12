import { create } from "zustand";
import {RepoStore} from "@/types/github.types";
import axios from "axios";

const GITWRITE_AUTH_TOKEN = import.meta.env.VITE_GITWRITE_AUTH_TOKEN;

export const useGithubStore = create<RepoStore>((set) => ({
    readme: "",
    repos: [],
    gitUser: null,
    sha: null,
    setRepos: (repos) => set({repos}),
    fetchRepos: async (githubUsername?: string) => {
        try {
            const { data} = await axios.get(`https://api.github.com/users/${githubUsername}/repos`)

            if (Array.isArray(data)) {
                set({repos: data});
                return {success: true, message: "Repositories fetched successfully"};
            } 

            return {success: false,  message: "Unexpected response format"};
        } catch (error) {
            return {success: false, message: "Failed to fetch templates"};            
        }
    },
    fetchReadme: async (full_name: string) => {
        try {
            const { data } = await axios.get(`https://raw.githubusercontent.com/${full_name}/main/README.md`);

            set({readme: data});
            return {success: true, message: "Readme fetched successfully"};
            
        } catch (error) {
            return {success: false, message: "Failed to fetch templates"};            
        }
    },
    fetchUserData: async (githubUsername: string) => {
        try {
            const { data } = await axios.get(`https://api.github.com/users/${githubUsername}`);

            set({gitUser: data});
            return {success: true, message: "User data fetched successfully"};
        } catch (error) {
            return {success: false, message: "Failed to fetch user data"};
        }
    },
    fetchSHA: async (full_name: string) => {
        try {
            const { data } = await axios.get(`https://api.github.com/repos/${full_name}/contents/README.md`, {
                headers: {
                    'Authorization': GITWRITE_AUTH_TOKEN
                }
            })
            set({sha: data.sha});
            return {success: true, message: "SHA fetched successfully"};
        } catch (error) {
            return {success: false, message: "Failed to fetch SHA"};
        }
    }
}));