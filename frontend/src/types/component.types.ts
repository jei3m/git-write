export interface SelectRepoProps {
    selectedRepo: string | null;
    setSelectedRepo: (repoTitle: string) => void;
    setInitialReadme: (readme: string) => void;
    setMarkdown: (readme: string) => void;
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

export interface CommitState {
  full_name: string;
  sha: string;
  content: string;
  message: string;
  description: string;
  branch: string;
}

export interface CommitDialogProps {
  isCommitDisabled: boolean;
  isCommit: boolean;
  setCommit: (commit: CommitState) => void;
  commit: CommitState;
  handleCommit: () => void;
}