import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function ProfitInYearChart({ profitInYear }) {
  return (
    <BarChart
      series={[
        {
          data: [
            profitInYear.totalIngredientCost,
            profitInYear.totalRevenue,
            profitInYear.profit,
          ],
          name: "Lợi nhuận của năm",
        },
      ]}
      width={500}
      height={300}
      margin={{ left: 100 }}
      xAxis={[
        {
          id: "profitInYear",
          data: ["Tiền nguyên liệu", "Doanh thu", "Lợi nhuận"],
          scaleType: "band",
        },
      ]}
    />
  );
}
