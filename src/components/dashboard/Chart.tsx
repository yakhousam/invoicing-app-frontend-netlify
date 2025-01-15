import useChart from "@/hooks/useChart";
import { BarChart } from "@mui/x-charts/BarChart";
import dayjs from "dayjs";

export const Chart = () => {
  const data = useChart();
  const dataset = data?.map((item) => ({
    ...item,
    date: dayjs()
      .month(item.date.month - 1)
      .format("MMMM"),
  }));
  return (
    <BarChart
      dataset={dataset ?? []}
      xAxis={[{ scaleType: "band", dataKey: "date" }]}
      series={[
        { dataKey: "total", label: "Total" },
        // { dataKey: 'paid', label: 'Paid' },
        { dataKey: "unpaid", label: "unpaid" },
      ]}
    />
  );
};
