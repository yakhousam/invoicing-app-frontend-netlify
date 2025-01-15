import { formatCurrency } from "@/helpers";
import { invoicesOptions } from "@/queries";
import { type Invoice } from "@/validations";
import { Chip, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";

const InvoicesTable = () => {
  const navigate = useNavigate();

  const { data, isError, isLoading } = useSuspenseQuery(invoicesOptions);

  const columns = useMemo<MRT_ColumnDef<Invoice>[]>(() => {
    return [
      {
        accessorKey: "invoiceId",
        header: "N°",
        enableColumnFilter: false,
      },
      {
        accessorKey: "clientName",
        header: "Client",
        accessorFn(originalRow) {
          return originalRow.clientName;
        },
        filterFn: "customFilterFn",
        enableSorting: false,
      },
      {
        accessorKey: "invoiceDate",
        header: "Date",
        accessorFn(originalRow) {
          return dayjs(originalRow.invoiceDate).format("DD/MM/YYYY");
        },
        enableColumnFilter: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 50,
        enableColumnFilter: true,
        filterVariant: "select",
        filterSelectOptions: ["sent", "paid", "overdue"],
        Cell: ({ cell }) => {
          const status = cell.getValue<Invoice["status"]>();
          return (
            <Chip
              label={
                <Typography variant="inherit" textTransform="capitalize">
                  {status}
                </Typography>
              }
              color={
                status === "paid"
                  ? "success"
                  : status === "sent"
                    ? "info"
                    : "secondary"
              }
            />
          );
        },
      },
      {
        accessorKey: "totalAmount",
        header: "Price",
        enableColumnFilter: false,
        accessorFn(originalRow) {
          return formatCurrency(originalRow.currency)(originalRow.totalAmount);
        },
        muiTableHeadCellProps: {
          align: "right",
        },
        muiTableBodyCellProps: {
          align: "right",
        },
      },
    ];
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: data?.invoices ?? [],
    state: {
      showSkeletons: isLoading,
      showAlertBanner: isError,
    },
    rowCount: data?.count ?? 0,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,

    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        navigate({
          to: "/invoices/$id",
          params: { id: row.original.invoiceId },
        });
      },
      sx: { cursor: "pointer" },
    }),
    muiTablePaperProps: {
      elevation: 0,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [2, 10, 25, 50],
    },
  });

  return <MaterialReactTable table={table} />;
};

export default InvoicesTable;
