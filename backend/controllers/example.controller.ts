import Example from "../models/example.model";
import mongoose from "mongoose";

export const createExample = async (req: any, res: any): Promise<any> => {

    const example = req.body;

    if (!example.name || !example.description) {
        return res.status(404).json({success: false, message: "All fields are required"});
    }

    const newExample = new Example(example);

    try {
        await newExample.save();
        res.status(201).json({success: true, data: newExample});
    } catch (error) {
        console.error(`Error in Create Example: ${error}`);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
};

export const getExamples = async (req: any, res: any): Promise<any> => {
    try {
        const examples = await Example.find({}); //Empty object to get all examples
        res.status(200).json({success: true, data: examples});
    } catch (error) {
        console.error(`Error in Get Examples: ${error}`);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
};

export const updateExample = async (req: any, res: any): Promise<any> => {
    const {id} = req.params;
    const example = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Example ID!"});
    }

    try {
        const updatedExample = await Example.findByIdAndUpdate(id, example, {new: true});
        res.status(200).json({sucess: true, data: updatedExample});
    } catch (error) {
        console.error(`Error in Update Example: ${error}`);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
};

export const deleteExample = async (req: any, res: any): Promise<any> => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Example ID!"});
    }

    try {
        await Example.findByIdAndDelete(id);
        res.status(200).json({sucess: true, message: "Example deleted successfully"});
    } catch (error) {
        console.error(`Error in Delete Example: ${error}`);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
    
};