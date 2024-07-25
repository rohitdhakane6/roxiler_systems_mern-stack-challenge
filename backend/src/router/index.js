import { Router } from "express";
import { getTransactions } from "../controllers/transactions.js";
import { getStatistics } from "../controllers/statistics.js";
import { getBarChart } from "../controllers/barchart.js";
import { getPieChart } from "../controllers/piechart.js";

const router = Router();


router.get("/transactions", getTransactions);
router.get("/statistics", getStatistics);
router.get("/barchart",getBarChart);
router.get("/paichart",getPieChart)

export default router;
