import Template from "../models/template.model";
import mongoose from "mongoose";
import { Request, Response } from "express";

export const createTemplate = async (req: Request, res: Response): Promise<any> => {

    const template = req.body;

    if (!template.userId || !template.title || !template.content) {
        return res.status(404).json({ success: false, message: "All fields are required" });
    }

    const newTemplate = new Template(template);

    try {
        await newTemplate.save();
        res.status(201).json({ success: true, data: newTemplate });
    } catch (error) {
        console.error(`Error in Create Template: ${error}`);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }

};

export const getTemplates = async (req: Request, res: Response): Promise<any> => {
    try {
        const {userId} = req.query;
        const filter = userId ? { userId } : {};
        const templates = await Template.find(filter);
        res.status(200).json({ success: true, data: templates });
    } catch (error) {
        console.error(`Error in Get Templates: ${error}`);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
};

export const getTemplateById = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Template ID!" });
    }
    
    try {
        const template = await Template.findById(id);
        
        if (!template) {
            return res.status(404).json({ success: false, message: "Template not found" });
        }
        
        res.status(200).json({ success: true, data: template });
    } catch (error) {
        console.error(`Error in Get Template By ID: ${error}`);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
};

export const updateTemplate = async (req: Request, res: Response): Promise<any> => {
    const {id} = req.params;
    const template = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Template ID!" });
    }

    try {
        const updatedTemplate = await Template.findByIdAndUpdate(id, template, { new: true });
        res.status(200).json({ success: true, data: updatedTemplate });
    } catch (error) {
        console.error(`Error in Update Template: ${error}`);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
};

export const deleteTemplate = async (req: Request, res: Response): Promise<any> => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Template ID!" });
    }

    try {
        await Template.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Template deleted successfully"});
    } catch (error) {
        console.error(`Error in Delete Template: ${error}`);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
};