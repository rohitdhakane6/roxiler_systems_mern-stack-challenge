import Product from "../models/Product.js";

export const getStatistics = async (req, res) => {
  try {
    const { month='03' } = req.query;  

    if (!month || !/^\d{2}$/.test(month)) {
      return res.status(400).json({ error: "Invalid month format. Use 'MM' format." });
    }
    if (month>12) {
        return res.status(400).json({ error: "Invalid month " });
    }

    const stats = await Product.aggregate([
      {
        $project: {
          month: { $month: "$dateOfSale" },
          price: 1,
          sold: 1
        }
      },
      {
        $match: {
          month: parseInt(month, 10)  
        }
      },
      {
        $group: {
          _id: null,
          saleAmount: { $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] } },
          soldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
          notSoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } }
        }
      },
    ]);

    return res.json(stats);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
