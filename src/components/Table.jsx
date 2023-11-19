import * as React from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function BasicTable({ data, titles }) {
  const adjustedTitles = titles.map(title => ({
    ...title,
    flex: 1, 
  }));

  return (
    <Box className="h-80vh w-full">
      <DataGrid
        className="bg-white"
        rows={data}
        columns={adjustedTitles}
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
