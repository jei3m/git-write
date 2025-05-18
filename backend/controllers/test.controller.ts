import Test from "../models/test.model";
import { Request, Response } from "express";

export const getTests = async (req: Request, res: Response): Promise<any> => {
    try {
        const tests = await Test.find({});
        res.status(200).json({ success: true, data: tests});
    } catch (error) {
        console.error(`Error in Get Tests: ${error}`);
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}