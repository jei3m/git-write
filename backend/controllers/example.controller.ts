import mongoose from "mongoose";
import Example from "../models/example.model.js";

export const getExamples = async (req, res) => {
    try {
        const examples = await Example.find({});
        res.status(200).json({sucess: true, data: examples});
    } catch (error) {
        console.error(`Error in Get Examples: ${error.message}`);
        res.status(500).json({sucess: false, message: "Internal Server Error"});
    }
}

export const createExample = async (req, res) => {
    const example = req.body;

    if ( !example.name || !example.description ) {
        return res.status(400).json({sucess: false, message: "All fields are requires"});
    }

    const newExample = new Example(example);

    try {
        await newExample.save();
        res.status(201).json({sucess: true, data: newExample});
    } catch (error) {
        console.error(`Error in Create Example: ${error.message}`);
        res.status(500).json({sucess: false, message: "Internal Server Error"});
    }
}

export const updateExample = async (req, res) => {
    const {id} = req.params;
    const example = req.body;

    if (mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({sucess: false, message: "Invalid Example ID"})
    }

    try {
        const updatedExample = await Example.findByIdAndUpdate(id, example, {new:true});
        res.status(200).json({sucess: true, data: updatedExample})
    } catch (error) {
        console.error(`Error in Update Example: ${error}`);
        res.status(500).json({sucess: false, message: "Internal Server Error"});
    }
}

export const deleteExample = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Example ID!"})
    }

    try {
        await Example.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Example deleted successfully!"})
    } catch (error) {
        console.error(`Error in Delete Example: ${error}`);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}