import { invoicesOptions } from "@/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useMemo } from "react";

export type ChartData = {
  date: {
    month: number;
    year: number;
  };
  total: number;
  paid: number;
  unpaid: number;
};

function useChart() {
  const { data: invoices } = useSuspenseQuery({
    ...invoicesOptions,
    select: (data) => data.invoices,
  });

  const data = useMemo(() => {
    return invoices?.reduce<ChartData[]>((acc, invoice) => {
      const month = dayjs(invoice.invoiceDate).month();
      const year = dayjs(invoice.invoiceDate).year();
      const total = invoice.totalAmount;
      const paid = invoice.paid ? total : 0;
      const unpaid = invoice.paid ? 0 : total;
      const index = acc.findIndex(
        (summary) => summary.date.month === month && summary.date.year === year
      );
      if (index === -1) {
        acc.push({ date: { month, year }, total, paid, unpaid });
      } else {
        acc[index].total += total;
        acc[index].paid += paid;
        acc[index].unpaid += unpaid;
      }

      return acc;
    }, []);
  }, [invoices]);

  return data;
}

export default useChart;
