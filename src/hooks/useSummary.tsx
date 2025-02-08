import { invoicesOptions } from "@/queries";
import { Invoice } from "@/validations";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, createContext, useContext } from "react";

type Summary = {
  currency: Invoice["currency"];
  total: number;
  paid: number;
  unpaid: number;
};

const SummaryContext = createContext<Summary[] | null>(null);

export function SummaryProvider({ children }: { children: React.ReactNode }) {
  const { data: invoices } = useSuspenseQuery({
    ...invoicesOptions,
    select: (data) => data.invoices,
  });
  const data = useMemo(() => {
    console.log("running useMemo in Summary.tsx", invoices?.length);
    return invoices?.reduce<Summary[]>((acc, invoice) => {
      const currency = invoice.currency;
      const total = invoice.totalAmount;
      const paid = invoice.status === "paid" ? total : 0;
      const unpaid = invoice.status === "paid" ? 0 : total;
      const index = acc.findIndex((summary) => summary.currency === currency);
      if (index === -1) {
        acc.push({ currency, total, paid, unpaid });
      } else {
        acc[index].total += total;
        acc[index].paid += paid;
        acc[index].unpaid += unpaid;
      }

      return acc;
    }, []);
  }, [invoices]);

  return (
    <SummaryContext.Provider value={data}>{children}</SummaryContext.Provider>
  );
}

export const useSummary = () => {
  const context = useContext(SummaryContext);
  if (!context) {
    throw new Error("useSummary must be used within a SummaryProvider");
  }
  return context;
};
