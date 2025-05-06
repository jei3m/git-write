import { create } from "zustand";
import {RepoStore} from "@/types/repo.types";

export const useRepoStore = create<RepoStore>((set) => ({
    readme: "",
    repos: [],
    setRepos: (repos) => set({repos}),
    fetchRepos: async (githubUsername?: string) => {
        try {
            const res = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
            const data = await res.json();

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
            const res = await fetch(`https://raw.githubusercontent.com/${full_name}/main/README.md`)
            const data = await res.text();

            set({readme: data});
            return {success: true, message: "Readme fetched successfully"};
            
        } catch (error) {
            return {success: false, message: "Failed to fetch templates"};            
        }
    }
}));