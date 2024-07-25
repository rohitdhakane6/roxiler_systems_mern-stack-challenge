import Product from "../models/Product.js";

export const getTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "", month = 3 } = req.query;
    const pageNumber = parseInt(page);
    const itemsPerPage = parseInt(perPage);
    const selectedMonth = parseFloat(month);
    const searchNumber = parseFloat(search);
    const isNumber = !isNaN(searchNumber) && isFinite(searchNumber);
    const isMonthValid = !isNaN(selectedMonth) && selectedMonth >= 1 && selectedMonth <= 12;

    if (!isMonthValid) {
      return res.status(400).json({ error: "Invalid month. Must be between 1 and 12." });
    }

    const query = {
      $expr: { $eq: [{ $month: "$dateOfSale" }, selectedMonth] }
    };

    if (search) {
      if (isNumber) {
        query.price = { $eq: searchNumber };
      } else {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }
    }

    const products = await Product.find(query)
      .skip((pageNumber - 1) * itemsPerPage)
      .limit(itemsPerPage);

    const totalItems = await Product.countDocuments(query);

    return res.json({
      products,
      totalItems,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalItems / itemsPerPage),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
