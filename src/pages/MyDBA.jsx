import { useState } from 'react';
import { useAllTables, useImportTable, useExportTable, useDeleteTableData } from '../query-hooks/dba-query-hook';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function MyDBA() {
  const { user } = useAuth();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  const { data: tables, isLoading } = useAllTables(skip, limit);
  const { mutate: importTable } = useImportTable();
  const { mutate: exportTable } = useExportTable();
  const navigate = useNavigate();
  const { mutate: deleteTableData } = useDeleteTableData();

  const handleImport = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    importTable(formData, {
      onSuccess: () => {
        toast.success('Table imported successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
      onError: (error) => {
        toast.error(`Failed to import table: ${error.message}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
    });
  };

  const handleDeleteTable = (tableName) => {
    if (tableName) {
      deleteTableData(
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
    }
  };

  const handleExport = (tableName) => {
    exportTable(tableName, {
      onSuccess: (data) => {
        console.log('Export response:', data); // Debugging

        // Check if the response is a Blob
        if (data instanceof Blob) {
          // Create a URL for the Blob
          const url = window.URL.createObjectURL(data);

          // Create a temporary link element
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${tableName}.sql`); // Set the filename
          document.body.appendChild(link);

          // Trigger the download
          link.click();

          // Clean up
          link.remove();
          window.URL.revokeObjectURL(url);

          toast.success('Table exported successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          console.error('Unexpected response format:', data);
          toast.error('Failed to export table. Invalid response format.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      },
      onError: (error) => {
        console.error('Export failed:', error);
        toast.error(`Failed to export table: ${error.message}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 my-28 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">My DBA</h1>
        <form
          onSubmit={handleImport}
          encType="multipart/form-data"
          className="flex items-center gap-4 flex-wrap"
        >
          <label htmlFor="sqlFile" className="text-sm font-medium text-gray-700">
            Import Table
          </label>
          <input
            type="file"
            id="sqlFile"
            name="file"
            accept=".sql"
            required
            className="border border-gray-300 rounded-md text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Import
          </button>
        </form>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center my-8">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        /* Table List */
        <div className="space-y-6">
          {tables?.map((table) => (
            <div key={table.table_name} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4  flex-wrap">
                <h3 className="text-xl font-semibold text-gray-700">
                  {table.table_name}
                </h3>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/dashboard/myDBA/show/${table.table_name}`}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Show
                  </Link>
                  <button
                    onClick={() => handleDeleteTable(table.table_name)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Empty
                  </button>
                  <button
                    onClick={() => handleExport(table.table_name)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Export
                  </button>
                </div>
              </div>
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                  <tr className='flex flex-wrap'>
                    {table.columns?.map((column) => (
                      <th
                        key={column.name}
                        className="px-6 py-3 text-left text-sm font-semibold uppercase"
                      >
                        {column.name}
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyDBA;