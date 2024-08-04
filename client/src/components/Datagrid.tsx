import React from 'react';

import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

export default function Datagrid({ data }: { data: any }) {

  const classMap: any = {};
  const hourMap: any = {};
  const columns: GridColDef[] = [{ field: 'hour', headerName: 'hour', width: 150 }];

  let rowsData: any = Array.from(Array(24).keys());

  for (let index = 0; index < rowsData.length; index++){
    rowsData[index] = {id: index, hour: index}
  }

  for (const stat of data) {
    if (!classMap[stat.class]) {
      columns.push({ field: stat.class, headerName: stat.class, width: 150 });
      classMap[stat.class] = true;
    }

    if (!hourMap[stat.hour]) {
      const data: any = {};
      data[stat.class] = stat.count;
      data['hour'] = stat.hour;
      data['id'] = stat.hour;
      rowsData[stat.hour] = { ...rowsData[stat.hour], ...data };
    }
  }

  



  console.log(rowsData)

  return (
    <Box style={{ height: 500, width: '100%' }}>
      <DataGrid rows={rowsData} columns={columns} />
    </Box>
  );
}