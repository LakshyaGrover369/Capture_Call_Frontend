import React from "react";
import { Chart } from "react-google-charts";

export type PieChartProps = {
  data: (string | number)[][]; // 2D array: first row is header
  options?: Record<string, any>; // Google Charts options
  width?: string;
  height?: string;
};

const PieChart: React.FC<PieChartProps> = ({
  data,
  options = {},
  width = "100%",
  height = "400px",
}) => {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={width}
      height={height}
    />
  );
};

export default PieChart;
