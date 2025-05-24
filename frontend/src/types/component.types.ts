import { Dispatch, SetStateAction } from "react";

export interface SelectRepoProps {
    selectedRepo: string | null;
    setSelectedRepo: (repoTitle: string) => void;
    setRepoFullName: (repoName: string) => void;
    setInitialReadme: (readme: string) => void;
    setMarkdown: (readme: string) => void;
    setCommit: Dispatch<SetStateAction<{
        full_name: string;
        sha: string;
        content: string;
        message: string;
    }>>;
}

export interface SelectFeatureProps {
    selectedFeature: string;
    setSelectedFeature: (value: string) => void;
}

export interface TemplateSelectorProps {
    setMarkdown: (value: string) => void;
}

export interface DeleteTemplateProps {
    handleDeleteTemplate: (id: string) => void;
    template: {_id: string};
}