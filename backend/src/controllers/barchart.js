import Product from "../models/Product.js";

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
            101,
            201,
            301,
            401,
            501,
            601,
            701,
            801,
            901,
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
                  case: {
                    $eq: ["$_id", "901-above"],
                  },
                  then: "901-above",
                },
                {
                  case: {
                    $eq: ["$_id", 0],
                  },
                  then: "0-100",
                },
                {
                  case: {
                    $eq: ["$_id", 101],
                  },
                  then: "101-200",
                },
                {
                  case: {
                    $eq: ["$_id", 201],
                  },
                  then: "201-300",
                },
                {
                  case: {
                    $eq: ["$_id", 301],
                  },
                  then: "301-400",
                },
                {
                  case: {
                    $eq: ["$_id", 401],
                  },
                  then: "401-500",
                },
                {
                  case: {
                    $eq: ["$_id", 501],
                  },
                  then: "501-600",
                },
                {
                  case: {
                    $eq: ["$_id", 601],
                  },
                  then: "601-700",
                },
                {
                  case: {
                    $eq: ["$_id", 701],
                  },
                  then: "701-800",
                },
                {
                  case: {
                    $eq: ["$_id", 801],
                  },
                  then: "801-900",
                },
              ],
              default: "unknown",
            },
          },
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
