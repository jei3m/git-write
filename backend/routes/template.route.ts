import express, {Router} from "express";
import { createTemplate, getTemplates, updateTemplate, deleteTemplate } from "../controllers/template.controller";

const router: Router = express.Router();

router.get('/', getTemplates);
router.post('/', createTemplate);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

export default router;