export interface Template {
    _id: string;
    userId: string;
    title: string;
    content: string;
    createdAt: string,
    updatedAt: string,
}

export interface NoIDTemplate {
    userId: string;
    title: string;
    content: string;
}

interface TemplateResponse {
    success: boolean;
    message: string;
    data?: any;
}

export interface TemplateStore {
    templates: Template[];
    setTemplates: (templates: any[]) => void;
    createTemplate: (newTemplate: NoIDTemplate) => Promise<TemplateResponse>;
    fetchTemplates: (userId?: string) => Promise<TemplateResponse>;
    fetchTemplateById: (tid: string, userId: string) => Promise<TemplateResponse>;
    deleteTemplate: (tid: string, userId: string) => Promise<TemplateResponse>;
    updateTemplate: (tid: string, updatedProduct: NoIDTemplate) => Promise<TemplateResponse>;
}