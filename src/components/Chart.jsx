import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Chart({ data }) {
  // Extraer y convertir las fechas a solo el día del mes
  const xAxisData = [0, ...data.axisArray.map(dateStr => {
    const date = new Date(dateStr);
    return parseInt(date.getDate());
  })];

  const seriesArray = [0, ...data.seriesArray]
  console.log(xAxisData);
 
  return (
    <LineChart
      xAxis={[
        {
          data: xAxisData,
          type: 'number',
          tickInterval: xAxisData
        }
      ]}
      series={[
        {
          data: seriesArray,
        },
      ]}
      width={900}
      height={395}
    />
  );
}

