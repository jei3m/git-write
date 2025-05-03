import express, {Router} from "express";
import { createExample, getExamples, updateExample, deleteExample } from "../controllers/example.controller";

const router: Router = express.Router();

router.get('/', getExamples);
router.post('/', createExample);
router.put('/:id', updateExample);
router.delete('/:id', deleteExample);

export default router;