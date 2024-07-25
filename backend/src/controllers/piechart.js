import Product from "../models/Product.js";

export const getPieChart = async (req, res) => {
  try {
    const { month = 3 } = req.query;
    const selectedMonth = parseFloat(month);
    const isNumber = !isNaN(selectedMonth) && isFinite(selectedMonth);

    if (month) {
      if (!isNumber) {
        return res
          .status(400)
          .json({ error: "Invalid month format. Use 'MM' format." });
      }
      if (selectedMonth < 1 || selectedMonth > 12) {
        return res
          .status(400)
          .json({ error: "Invalid month. Must be between 1 and 12." });
      }
    }

    const stats = await Product.aggregate([
      {
        $project: {
          month: { $month: "$dateOfSale" },
          category: 1,
        },
      },
      {
        $match: {
          month: selectedMonth,
        },
      },
      {
        $group: {
          _id: "$category",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
    ]);

    return res.json(stats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
