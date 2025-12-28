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
    branches: [],
    selectedBranch: "",
    repoFullName: "",
    setRepos: (repos) => set({repos}),
    setSelectedBranch: (branch: string) => set({selectedBranch: branch}),
    fetchRepos: async (githubUsername?: string) => {
        try {
            const { data} = await axios.get(`https://api.github.com/users/${githubUsername}/repos`)
            set({repos: data});
            return {success: true, message: "Repositories fetched successfully"};
        } catch (error) {
            return {success: false, message: "Failed to fetch templates"};
        }
    },
    fetchBranches: async (full_name: string) => {
        try {
            const { data } = await axios.get(`https://api.github.com/repos/${full_name}/branches`, {
                headers: {
                    'Authorization': `Bearer ${githubToken}`,
                }
            });
            set({branches: data});

            return {success: true, message: "Branches fetched successfully", branches: data};
        } catch (error) {
            console.error("Error fetching branches:", error);
            return {success: false, message: "Failed to fetch branches"};
        }
    },
    fetchReadme: async (full_name: string, branch?: string) => {
        try {
            const branchParam = branch ? `?ref=${branch}` : '';
            const { data } = await axios.get(`https://api.github.com/repos/${full_name}/contents/README.md${branchParam}`, {
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
    fetchSHA: async (full_name: string, branch: string) => {
        try {
            const { data } = await axios.get(`https://api.github.com/repos/${full_name}/contents/README.md?ref=${branch}`, {
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
    postCommit: async (updateREADME: { 
            full_name: string, 
            sha: string, 
            content: string, 
            message: string, 
            description?: string,
            branch: string,
        }
    ) => {
        try {
            if (!updateREADME.sha || !updateREADME.content) {
                throw new Error("Missing required parameters");
            };

            if (!updateREADME.message) {
                throw new Error("Commit message is required");
            };

            const commitMessage = updateREADME.description 
                ? `${updateREADME.message}\n\n${updateREADME.description}`
                : updateREADME.message;

            const payload: any = {
                message: commitMessage,
                content: updateREADME.content,
                sha: updateREADME.sha,
                branch: updateREADME.branch
            };

            const { data } = await axios.put(`https://api.github.com/repos/${updateREADME.full_name}/contents/README.md`, payload,
                { headers: {
                    'Authorization': `Bearer ${githubToken}`
                }}
            );

            if (!data) throw new Error("Failed to update README");
            return {success: true, message: "README updated successfully!"};

        } catch (error: unknown) {
            if (error instanceof Error) return {success: false, message: error.message};
            return {success: false, message: "Error in updating README"};
        };
    }
}));