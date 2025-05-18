import express from "express";
import { getTests } from "../controllers/test.controller";

const router = express.Router();

router.get("/", getTests);

export default router;