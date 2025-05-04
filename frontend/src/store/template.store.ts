import { create } from "zustand";
import {TemplateStore} from "@/types/template.types";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const useTemplateStore = create<TemplateStore>((set) => ({
    templates: [],
    setTemplates: (templates) => set({templates}),
    createTemplate: async (newTemplate: {userId: string; title: string; content: string; }) => {
        
        if (!newTemplate.userId || !newTemplate.title || !newTemplate.content) {
            return {success: false, message: "All fields are required"};
        }

        try {
            const res = await fetch(`${VITE_API_URL}/api/templates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTemplate)
            })

            const data = await res.json();

            if (!data.success) {
                return {success: true, message: data.message};
            }

            set((state) => ({templates: [...state.templates, data]}));
            return {success: true, message:"Template created successfully!"};
            
        } catch (error) {
            return {success: false, message: "Internal Server Error"};
        }
    },
    fetchTemplates: async (userId?: string) => {
        try {
            const res = await fetch(`${VITE_API_URL}/api/templates?userId=${userId}`);
            const data = await res.json();

            if (!data.success) {
                return {success: false, message: data.message};
            }

            set({templates: data.data});
            return {success: true, message: data.message};
        } catch (error) {
            return {success: false, message: "Failed to fetch templates"};            
        }
    },
    fetchTemplateById: async (id: string) => {
        try {
            const res = await fetch(`${VITE_API_URL}/api/templates/${id}`);
            const data = await res.json();
    
            if (!data.success) {
                return {success: false, message: data.message};
            }
    
            return {success: true, message: "Template fetched successfully!", data: data.data};
        } catch (error) {
            return {success: false, message: "Failed to fetch template"};
        }
    },
    deleteTemplate: async (tid: string) => {
        try {
            const res = await fetch(`${VITE_API_URL}/api/templates/${tid}`, {
                method:"DELETE",
            })
            const data = await res.json();

            if (!data.success) {
                return {success: false, message: data.message};
            }
            
            set(state => ({templates: state.templates.filter(template => template._id !== tid)}));
            return {success: true, message: "Template deleted successfully!"};
        } catch (error) {
            return {success: false, message: "Failed to delete template"};
        }
    },
    updateTemplate: async (tid: string, updatedTemplate: {userId: string; title: string; content: string;}) => {
        try {
            const res = await fetch(`${VITE_API_URL}/api/templates/${tid}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTemplate)
            })
            const data = await res.json();

            if (!data.success) {
                return {success: false, message: data.message, data: null};
            }

            set(state => ({templates: state.templates.map(template => template._id === tid ? data : template)}));
            return {success: true, message: "Template updated successfully!"};
        } catch (error) {
            return {success: false, message: "Failed to update template"};
        }
    }
}));