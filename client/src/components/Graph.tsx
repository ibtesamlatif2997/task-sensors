import React, { useEffect, useState } from 'react';

import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import { LinePlot, MarkPlot, LineChart } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { Container } from '@mui/material';



export default function Graph({data}:{data:any}){
  const statsData:any = {
    EB: Array(24).fill(0),
    NB: Array(24).fill(0),
    SB: Array(24).fill(0),
    WB: Array(24).fill(0)
  };
  
  const xLabels:number[] = Array.from(Array(24).keys());

  const [stats, setStats] = useState(statsData)
  const [xValues, setXValues] = useState(xLabels)

  useEffect(()=>{
    data.forEach((element:any) => {
      statsData[element._id.approach][element._id.hour] = element.count;
    });
    setStats((prevState:any) => {
      return {...prevState, ...statsData}
    })
    setXValues(xLabels);
  }, [data]) ;

  return (
    <Container fixed>
      <LineChart
        width={1000}
        height={300}
        series={[
          { data: stats.EB, label: 'EB', type: 'line' },
          { data: stats.NB, label: 'NB', type: 'line' },
          { data: stats.SB, label: 'SB', type: 'line' },
          { data: stats.WB, label: 'WB', type: 'line' },
        ]}
        xAxis={[{ scaleType: 'point', data: xValues }]}
      >
        <LinePlot />
        <MarkPlot />
        <ChartsReferenceLine
          x="Page B"
          lineStyle={{ stroke: 'red' }}
        />
          <ChartsReferenceLine
          x="Page D"
          lineStyle={{ stroke: 'red' }}
        />
        <ChartsXAxis />
        <ChartsYAxis />
      </LineChart>
    </Container>)
}