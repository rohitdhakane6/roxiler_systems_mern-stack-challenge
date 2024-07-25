import React from "react";

const TransactionsTable = ({ transactions }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Sold
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Image
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-600">
          {transactions?.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 text-sm font-medium text-white">
                {item.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {item.title.length > 30
                  ? `${item.title.substring(0, 30)}...`
                  : item.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {item.description.length > 30
                  ? `${item.description.substring(0, 30)}...`
                  : item.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {item.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {item.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {item.sold ? "True" : "False"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-10 h-10 object-cover"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
