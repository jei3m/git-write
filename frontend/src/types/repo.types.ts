export interface Repo {
    id: string;
    name: string;
    full_name: string;
}

export interface Readme {
    readme: string;
    full_name: string;
}

interface RepoResponse {
    success: boolean;
    message: string;
}

export interface RepoStore {
    repos: Repo[]
    readme: string;
    setRepos: (repos: any[]) => void;
    fetchRepos: (githubUsername: string) => Promise<RepoResponse>;
    fetchReadme: (full_name: string) => Promise<RepoResponse>;
}