import { Invoice } from "@/validations";

export const formatCurrency = (currency: Invoice["currency"] = "USD") => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return (amount: number) => formatter.format(amount);
};

export const getFiledNameError = (errorMessage: string) => {
  let errorFieldName = null;
  if (/client name/i.test(errorMessage)) {
    errorFieldName = "clientName";
  }
  if (/email/i.test(errorMessage)) {
    errorFieldName = "email";
  }
  return errorFieldName as "clientName" | "email" | null;
};
