import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Chart({ data }) {

  // Extraer y convertir las fechas a solo el día del mes
  const xAxisData = data.axisArray.map(dateStr => {
    const date = new Date(dateStr);
    return date.getDate(); // Obtener solo el día del mes
  });

  return (
    <LineChart
      xAxis={[
        {
          data: xAxisData,
          type: 'category', // Cambiar a 'category' si solo mostramos números de día
        }
      ]}
      series={[
        {
          data: data.seriesArray,
        },
      ]}
      width={900}
      height={400}
    />
  );
}
