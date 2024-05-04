import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function RevenueInYearChart({ revenueInYear }) {
  console.log("Check revenueInYear: ", revenueInYear);

  return (
    <BarChart
      series={[
        {
          data: revenueInYear.map((month) => month.totalPrice),
          name: "Doanh thu",
          label: "Doanh thu",
        },

        // Add other series if needed
      ]}
      width={700} // Adjust width according to the number of months you want to display
      height={300}
      margin={{ left: 83 }}
      xAxis={[
        {
          id: "months",
          data: revenueInYear.map((month) => month.month),
          scaleType: "band",
        },
      ]}
    />
  );
}
