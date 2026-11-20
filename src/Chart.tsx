import type { EChartsOption } from 'echarts';
import { EChartsReact } from 'react-echarts-library';

export type ChartData = {
    time: string,
    tempF: number
}

export default function Chart({data, hourRange}:{data: ChartData[], hourRange: number}) {
  const option: EChartsOption = {
    title: {
        text: 'Temperature (ºF) Over Time',
        textStyle: {
            color: 'black',
            fontSize: 20
        }
    },
    xAxis: {
      type: 'time',
      name: 'Time',
      nameLocation: 'middle',
      nameTextStyle: {
        fontWeight: 'bold',
        fontSize: 16
      },
      axisLabel: {
        formatter: '{h}:{mm} {a}'
      },
      min: (value) => {
        return value.max - 1000 * 60 * 60 * hourRange
      }
    },
    yAxis: {
      type: 'value',
      max: 85,
      min: 55,
      name: 'Temperature (ºF)'
    },
    series: [{
      data: data.map(x => {
        const out = [x.time, x.tempF]
        return out
      }),
      type: 'scatter'
    }]
  };

  return <EChartsReact option={option} style={{ height: 400 }} />;
}