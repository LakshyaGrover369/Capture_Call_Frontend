import React from "react";
import { Chart } from "react-google-charts";

export type PieChartProps = {
  data: (string | number)[][];
  options?: Record<string, any>;
  width?: string;
  height?: string;
  title?: string;
};

const PieChart: React.FC<PieChartProps> = ({
  data,
  options = {},
  width = "100%",
  height = "350px",
  title = "",
}) => {
  const mergedOptions = {
    title,
    is3D: true,
    pieSliceText: "percentage",
    chartArea: { width: "90%", height: "80%" },
    legend: {
      position: "right",
      textStyle: { fontSize: 14 },
    },
    backgroundColor: "transparent",
    ...options,
  };

  return (
    <div className="bg-white rounded-2xl p-4 w-full max-w-[500px] m-auto">
      <Chart
        chartType="PieChart"
        data={data}
        options={mergedOptions}
        width={width}
        height={height}
      />
    </div>
  );
};

export default PieChart;
