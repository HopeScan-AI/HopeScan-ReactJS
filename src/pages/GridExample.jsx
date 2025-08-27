import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid React component
import { ClientSideRowModelModule } from 'ag-grid-community'; // Import the required module
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme CSS

const GridExample = () => {
  // Row data for the grid
  const [rowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
  ]);

  // Column definitions for the grid
  const [columnDefs] = useState([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
  ]);

  return (
    <div
      className="ag-theme-alpine" // Apply the AG Grid theme
      style={{ height: 400, width: 600 }} // Set grid size
    >
      <AgGridReact
        rowData={rowData} // Pass row data
        columnDefs={columnDefs} // Pass column definitions
        modules={[ClientSideRowModelModule]} // Register the module
        defaultColDef={{
          sortable: true, // Enable sorting
          filter: true, // Enable filtering
          resizable: true, // Enable column resizing
        }}
      />
    </div>
  );
};

export default GridExample;