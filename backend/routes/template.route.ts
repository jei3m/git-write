import express from "express";
import { createTemplate, getTemplates, getTemplateById, updateTemplate, deleteTemplate } from "../controllers/template.controller";

const router = express.Router();

router.get('/:userId', getTemplates);
router.get('/:userId/:id', getTemplateById); 
router.post('/', createTemplate);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

export default router;