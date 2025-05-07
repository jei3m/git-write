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
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
    name: string;
    company: string | null;
    blog: string;
    location: string;
    email: string | null;
    hireable: boolean | null;
    bio: string;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
}

export interface RepoStore {
    repos: Repo[]
    gitUser: GithubUser | null;
    readme: string;
    setRepos: (repos: any[]) => void;
    fetchRepos: (githubUsername: string) => Promise<RepoResponse>;
    fetchReadme: (full_name: string) => Promise<RepoResponse>;
    fetchUserData: (githubUsername: any) => Promise<RepoResponse>;
}