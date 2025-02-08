import { invoicesOptions } from "@/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useMemo, createContext, useContext } from "react";

export type ChartData = {
  date: {
    month: number;
    year: number;
  };
  total: number;
  paid: number;
  unpaid: number;
};

const ChartContext = createContext<ChartData[] | null>(null);

export function ChartProvider({ children }: { children: React.ReactNode }) {
  const { data: invoices } = useSuspenseQuery({
    ...invoicesOptions,
    select: (data) => data.invoices,
  });

  const data = useMemo(() => {
    console.log("running useChart", invoices?.length);
    console.time("chart");
    const d = invoices?.reduce<ChartData[]>((acc, invoice) => {
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
    console.timeEnd("chart");
    return d;
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
