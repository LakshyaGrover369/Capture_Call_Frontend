import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface TableColumn {
  header: string;
  accessor: string;
  type?: "button" | "image" | "buttonNavigate"; // Added 'image' type
  buttonText?: string;
  buttonAction?: string; // API endpoint for button action
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  searchable?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data = [],
  searchable = true,
}) => {
  const [searchColumn, setSearchColumn] = useState<string>(
    columns[0]?.accessor || ""
  );
  const [searchValue, setSearchValue] = useState<string>("");

  // Ensure data is an array before filtering
  const safeData = Array.isArray(data) ? data : [];

  const filteredData = safeData.filter((item) => {
    if (!searchValue) return true;
    const value = item[searchColumn]?.toString().toLowerCase();
    return value?.includes(searchValue.toLowerCase());
  });

  const handleButtonClick = async (baseApiEndpoint: string, rowData: any) => {
    try {
      const token = localStorage.getItem("token");
      const fullEndpoint = `${baseApiEndpoint}${rowData._id}`;
      await axios.delete(fullEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Optionally trigger a refresh or show a toast
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  return (
    <div className="w-full">
      {searchable && (
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <select
            className="p-2 border border-gray-300 rounded-lg shadow-sm text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchColumn}
            onChange={(e) => setSearchColumn(e.target.value)}
          >
            {columns.map(
              (column) =>
                column.accessor !== "id" &&
                column.type !== "image" &&
                column.type !== "button" && (
                  <option key={column.accessor} value={column.accessor}>
                    Search by {column.header}
                  </option>
                )
            )}
          </select>
          <input
            type="text"
            placeholder="Type to search..."
            className="p-2 border border-gray-300 rounded-lg shadow-sm text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
            <tr>
              {columns.map(
                (column, index) =>
                  column.accessor !== "id" && (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-semibold tracking-wider"
                    >
                      {column.header}
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredData.map((row, rowIndex) => (
              <tr
                key={row._id || rowIndex}
                className="hover:bg-blue-50 transition-all duration-200"
                id={row._id?.toString()}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${
                      column.accessor === "id" ? "hidden" : ""
                    }`}
                  >
                    {column.type === "button" ? (
                      <button
                        onClick={() =>
                          handleButtonClick(column.buttonAction || "", row)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1.5 px-4 rounded-lg shadow-sm transition-colors duration-200"
                      >
                        {column.buttonText || "Action"}
                      </button>
                    ) : column.type === "image" ? (
                      <img
                        src={row[column.accessor]}
                        alt={column.header}
                        className="h-10 w-10 object-cover rounded-full border border-gray-300"
                      />
                    ) : column.type === "buttonNavigate" ? (
                      <Link
                        to={`${column.buttonAction || ""}${row.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-4 rounded-lg shadow-sm transition-colors duration-200 inline-block text-center"
                      >
                        {`${column.buttonText}` || "Action"}
                      </Link>
                    ) : (
                      row[column.accessor]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
