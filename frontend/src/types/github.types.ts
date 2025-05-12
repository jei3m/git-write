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

export interface GithubUser {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
    html_url: string;
    name: string;
    location: string;
    bio: string;
}

export interface RepoStore {
    repos: Repo[]
    gitUser: GithubUser | null;
    readme: string;
    sha: string | null;
    setRepos: (repos: any[]) => void;
    fetchRepos: (githubUsername: string) => Promise<RepoResponse>;
    fetchReadme: (full_name: string) => Promise<RepoResponse>;
    fetchUserData: (githubUID: any) => Promise<RepoResponse>;
    fetchSHA: (full_name: string) => Promise<RepoResponse>;
}