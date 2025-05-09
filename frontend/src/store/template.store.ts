import { create } from "zustand";
import {TemplateStore} from "@/types/template.types";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const useTemplateStore = create<TemplateStore>((set) => ({
    templates: [],
    setTemplates: (templates) => set({templates}),
    createTemplate: async (newTemplate: {userId: string; title: string; content: string; }) => {
        
        if (!newTemplate.userId || !newTemplate.title || !newTemplate.content) {
            return {success: false, message: "All fields are required"};
        }

        try {
            const {data} = await axios.post(`${VITE_API_URL}/api/templates`, newTemplate);

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
            const {data} = await axios.get(`${VITE_API_URL}/api/templates`, {params: {userId}});

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
            const { data } = await axios.get(`${VITE_API_URL}/api/templates/${id}`);
    
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
            const { data } = await axios.delete(`${VITE_API_URL}/api/templates/${tid}`);

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
            const { data } = await axios.put(`${VITE_API_URL}/api/templates/${tid}`, updatedTemplate);

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