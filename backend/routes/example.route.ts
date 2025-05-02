import express from "express";
import { getExamples, createExample, updateExample, deleteExample } from "../controllers/example.controller.js";

const router = express.Router();

router.get('/', getExamples);
router.post('/', createExample);
router.put('/:id', updateExample);
router.delete('/:id', deleteExample);

export default router;