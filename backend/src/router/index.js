import { Router } from "express";
import { getTransactions } from "../controllers/transactions.js";
import { getStatistics } from "../controllers/statistics.js";
import { getBarChart } from "../controllers/barchart.js";
import { getPieChart } from "../controllers/piechart.js";

const router = Router();


router.get("/getTransactions", getTransactions);
router.get("/getStatistics", getStatistics);
router.get("/getBarChart",getBarChart);
router.get("/get",getPieChart)

export default router;
