import Product from "../models/Product.js";

const PRICE_RANGES = [
  "0-100",
  "101-200",
  "201-300",
  "301-400",
  "401-500",
  "501-600",
  "601-700",
  "701-800",
  "801-900",
  "901-above"
];

export const getBarChart = async (req, res) => {
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
          price: 1,
          month: {
            $month: "$dateOfSale",
          },
        },
      },
      {
        $match: {
          month: selectedMonth,
        },
      },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [
            0,
            100,
            200,
            300,
            400,
            500,
            600,
            700,
            800,
            900,
            Infinity,
          ],
          default: "901-above",
          output: {
            count: {
              $sum: 1,
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          priceRange: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$_id", 0] },
                  then: "0-100",
                },
                {
                  case: { $eq: ["$_id", 100] },
                  then: "101-200",
                },
                {
                  case: { $eq: ["$_id", 200] },
                  then: "201-300",
                },
                {
                  case: { $eq: ["$_id", 300] },
                  then: "301-400",
                },
                {
                  case: { $eq: ["$_id", 400] },
                  then: "401-500",
                },
                {
                  case: { $eq: ["$_id", 500] },
                  then: "501-600",
                },
                {
                  case: { $eq: ["$_id", 600] },
                  then: "601-700",
                },
                {
                  case: { $eq: ["$_id", 700] },
                  then: "701-800",
                },
                {
                  case: { $eq: ["$_id", 800] },
                  then: "801-900",
                },
                {
                  case: { $eq: ["$_id", 900] },
                  then: "901-above",
                },
              ],
              default: "unknown",
            },
          },
          count: 1,
        },
      },
    ]);

    // Create a map of price ranges with counts
    const statsMap = stats.reduce((map, item) => {
      map[item.priceRange] = item.count;
      return map;
    }, {});

    // Add missing ranges with count 0
    const completeStats = PRICE_RANGES.map(range => ({
      priceRange: range,
      count: statsMap[range] || 0
    }));

    return res.json(completeStats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
