import * as React from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function BasicTable({ data, titles}) {

  /**
   * Renders a table based on the provided data and titles.
   *
   * @param {Array} data - An array of objects representing the rows of the table.
   * @param {Array} titles - An array of strings representing the titles of the table columns.
   * @returns {JSX.Element} - The rendered table.
   */
  return (
    <Box  className="h-80vh w-full ">
      <DataGrid
        className="bg-white"
        rows={data}
        columns={titles}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        autoHeight 
      />
    </Box>
  );
}
