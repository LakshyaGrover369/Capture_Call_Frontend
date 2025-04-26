import React, { useState } from 'react';
import axios from 'axios';

interface TableColumn {
  header: string;
  accessor: string;
  type?: 'button';
  buttonText?: string;
  buttonAction?: string; // API endpoint for button action
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  searchable?: boolean;
}

const Table: React.FC<TableProps> = ({ columns, data = [], searchable = true }) => {
  const [searchColumn, setSearchColumn] = useState<string>(columns[0]?.accessor || '');
  const [searchValue, setSearchValue] = useState<string>('');

  // Ensure data is an array before filtering
  const safeData = Array.isArray(data) ? data : [];
  
  const filteredData = safeData.filter(item => {
    if (!searchValue) return true;
    const value = item[searchColumn]?.toString().toLowerCase();
    return value?.includes(searchValue.toLowerCase());
  });

  const handleButtonClick = async (baseApiEndpoint: string, rowData: any) => {
    try {
      const token = localStorage.getItem('token');
      const fullEndpoint = `${baseApiEndpoint}${rowData._id}`;
      await axios.delete(fullEndpoint, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Optionally trigger a refresh or show a toast
    } catch (error) {
      console.error('Error performing action:', error);
    }
  };
  

  return (
    <div className="w-full">
      {searchable && (
        <div className="mb-4 flex gap-4">
          <select 
            className="p-2 border rounded"
            value={searchColumn}
            onChange={(e) => setSearchColumn(e.target.value)}
          >
            {columns.map(column => (
              column.type !== 'button' && (
                <option key={column.accessor} value={column.accessor}>
                  Search by {column.header}
                </option>
              )
            ))}
          </select>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {filteredData.map((row, rowIndex) => (
              <tr key={row._id || rowIndex} id={row._id?.toString()}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {column.type === 'button' ? (
                      <button
                      onClick={() => handleButtonClick(column.buttonAction || '', row)}
                        className="bg-[var(--primary-color)] hover:bg-[var(--Btn-hover)] text-white font-bold py-2 px-4 rounded"
                      >
                        {column.buttonText || 'Action'}
                      </button>
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
