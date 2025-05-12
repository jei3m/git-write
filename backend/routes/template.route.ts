import express, {Router} from "express";
import { createTemplate, getTemplates, getTemplateById, updateTemplate, deleteTemplate } from "../controllers/template.controller";

const router: Router = express.Router();

// since you can only have one route parameter, use query parameters for non-unique identifiers as filter
router.get('/', getTemplates);
// You only can have one get/:id route (route parameter).
router.get('/:id', getTemplateById); 
router.post('/', createTemplate);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

export default router;