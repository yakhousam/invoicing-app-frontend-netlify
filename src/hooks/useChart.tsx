import { invoicesOptions } from "@/queries";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { createContext, useContext, useMemo } from "react";

export type ChartData = {
  date: {
    month: number;
    year: number;
  };
  total: number;
  paid: number;
  unpaid: number;
};

const ChartContext = createContext<ChartData[] | undefined>(undefined);

export function ChartProvider({ children }: { children: React.ReactNode }) {
  const { data: invoices } = useQuery({
    ...invoicesOptions,
    select: (data) => data.invoices,
    enabled: false,
  });
  console.log("running ChartProvider", invoices?.length);

  const data = useMemo(() => {
    return invoices?.reduce<ChartData[]>((acc, invoice) => {
      const month = dayjs(invoice.invoiceDate).month();
      const year = dayjs(invoice.invoiceDate).year();
      const total = invoice.totalAmount;
      const paid = invoice.status === "paid" ? total : 0;
      const unpaid = invoice.status === "paid" ? 0 : total;
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
  return <ChartContext.Provider value={data}>{children}</ChartContext.Provider>;
}

export function useChart() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a ChartProvider");
  }

  return context;
}
