import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function ProfitInAllMonthsChart({ profitAllMonths }) {
  console.log("Check profitAllMonths: ", profitAllMonths);

  return (
    <BarChart
      series={[
        {
          data: profitAllMonths.map((month) => month.revenue),
          name: "Doanh thu",
          label: "Doanh thu",
        },
        {
          data: profitAllMonths.map((month) => month.profit),
          name: "Lợi nhuận",
          label: "Lợi nhuận",
        },
        {
          data: profitAllMonths.map((month) => month.totalIngredientCost),
          name: "Chi phí",
          label: "Chi phí",
        },
        // Add other series if needed
      ]}
      width={700} // Adjust width according to the number of months you want to display
      height={300}
      margin={{ left: 83 }}
      xAxis={[
        {
          id: "months",
          data: profitAllMonths.map((month) => month.month),
          scaleType: "band",
        },
      ]}
    />
  );
}
