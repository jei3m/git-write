import { create } from "zustand";
import {RepoStore} from "@/types/github.types";
import axios from "axios";
import { getGithubToken } from "@/utils/github-token";
import { fromBase64 } from "@/utils/base64";

const githubToken = getGithubToken();

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
            const { data } = await axios.get(`https://api.github.com/repos/${full_name}/contents/README.md`, {
                headers: {
                    'Authorization': `Bearer ${githubToken}`,
                }
            });
            const decoded = fromBase64(data.content);
            set({readme: decoded});

            return {success: true, message: "Readme fetched successfully"};
        } catch (error) {
            return {success: false, message: "Failed to fetch templates"};            
        }
    },
    fetchUserData: async (githubUID: string) => {
        try {
            const { data } = await axios.get(`https://api.github.com/user/${githubUID}`);

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
                    'Authorization': githubToken
                }
            })
            set({sha: data.sha});
            return {success: true, message: "SHA fetched successfully"};
        } catch (error) {
            return {success: false, message: "Failed to fetch SHA"};
        }
    },
    postCommit: async (updateREADME: { full_name: string, sha: string, content: string, message: string }) => {
        try {
            if (!updateREADME.sha || !updateREADME.content || !updateREADME.message) {
                return {success: false, message: "Missing required parameters"};
            }

            const payload = {
                message: updateREADME.message,
                content: updateREADME.content,
                sha: updateREADME.sha
            }

            const { data } = await axios.put(`https://api.github.com/repos/${updateREADME.full_name}/contents/README.md`, payload,
                {
                    headers: {
                        'Authorization': `Bearer ${githubToken}`
                    }
                }
            )

            if (!data) {
                return {success: false, message: "Error in updating README"};
            }
            
            return {success: true, message: "README updated successfully!"};
        } catch (error) {
            return {success: false, message: "Error in updating README"};
        }
    }
}));