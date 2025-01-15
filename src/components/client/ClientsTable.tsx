import { clientsOptions } from "@/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";
import { Client } from "@/validations";

const ClientsTable = () => {
  const navigate = useNavigate();
  const { data, isError, isLoading } = useSuspenseQuery(clientsOptions);
  const clients = data?.clients;
  const columns = useMemo<MRT_ColumnDef<Client>[]>(() => {
    return [
      {
        accessorKey: "clientName",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },

      {
        accessorKey: "address",
        header: "Address",
      },
    ];
  }, []);

  const table = useMaterialReactTable({
    columns,
    data: clients ?? [],
    state: {
      isLoading,
      showAlertBanner: isError,
    },
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiTablePaperProps: {
      elevation: 0,
    },

    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        navigate({
          to: "/clients/$id",
          params: { id: row.original.clientId },
        });
      },
      sx: { cursor: "pointer" },
    }),
  });

  return <MaterialReactTable table={table} />;
};

export default ClientsTable;
