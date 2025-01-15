import { invoicesOptions } from "@/queries";
import { Invoice } from "@/validations";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";

type Summary = {
  currency: Invoice["currency"];
  total: number;
  paid: number;
  unpaid: number;
};

const useSummary = () => {
  const { data: invoices } = useSuspenseQuery({
    ...invoicesOptions,
    select: (data) => data.invoices,
  });
  const data = useMemo(() => {
    console.log("running useMemo in Summary.tsx");
    return invoices?.reduce<Summary[]>((acc, invoice) => {
      const currency = invoice.currency;
      const total = invoice.totalAmount;
      const paid = invoice.paid ? total : 0;
      const unpaid = invoice.paid ? 0 : total;
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
  return data;
};

export default useSummary;
