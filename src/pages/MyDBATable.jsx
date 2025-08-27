import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTableData, useDeleteTableData } from '../query-hooks/dba-query-hook';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function MyDBATable() {
  const { tableName } = useParams();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  const { data, isLoading } = useTableData(tableName, skip, limit);
  const { mutate: deleteData } = useDeleteTableData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tableName) navigate('/myDBA');
  }, [tableName, navigate]);

  const handleDeleteTable = () => {
    if (tableName) {
      deleteData(
        { tableName, skip, limit }
        
      );
      toast.success('Table data emptied successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // setTimeout(()=>window.location.reload(), 2000);
     
    }
  };

  const handleDeleteRow = (rowId) => {
    // Replace this with your actual delete row logic
    console.log('Delete row', rowId);
    toast.success('Row deleted successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (!data || !tableName) return null;

  return (
    <div className="max-w-7xl my-28 mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">myDBA</h1>
        <div className="flex items-center justify-between gap-4  flex-wrap">
          <h2 className="text-2xl text-gray-700">{tableName}</h2>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            onClick={handleDeleteTable}
          >
            Empty Table
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-8">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        /* Table */
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-500 text-white">
              <tr>
                {data.columns?.map((column) => (
                  <th
                    key={column}
                    className="px-6 py-3 text-left text-sm font-semibold uppercase"
                  >
                    {column}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.rows?.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors even:bg-gray-50"
                >
                  {data.columns?.map((column) => (
                    <td
                      key={column}
                      className="px-6 py-4 text-sm text-gray-700"
                    >
                      {row[column]}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                      onClick={() => handleDeleteRow(row.id)} // Replace with actual row ID
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyDBATable;