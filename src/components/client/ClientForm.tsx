import { serviceClients } from "@/services/clients";
import LoadingButton from "@/components/LoadingButton";
import RHFTextField from "@/components/RHF/RHFTextField";
import { Client, CreateClient, createClientSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid2 as Grid } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { clientsOptions } from "@/queries";
import { getFiledNameError } from "@/helpers";

function ClientForm() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const formMethods = useForm<CreateClient>({
    defaultValues: {
      clientName: "",
      email: "",
      address: "",
    },
    resolver: zodResolver(createClientSchema),
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = formMethods;

  const mutation = useMutation({
    mutationFn: (data: CreateClient) => serviceClients.createOne(data),
    onSuccess: (data) => {
      formMethods.reset();
      enqueueSnackbar("Client created", { variant: "success" });
      queryClient.setQueryData(clientsOptions.queryKey, (oldData) => {
        if (oldData) {
          return {
            clients: [...oldData.clients, data],
            count: oldData.count + 1,
          };
        }
        return {
          clients: [data],
          count: 1,
        };
      });
    },

    onError: async (error: Error | Response) => {
      console.error(error);
      if (error instanceof Response && error.status === 409) {
        const errorMessage = await error.text();
        const errorFieldName = getFiledNameError(errorMessage);
        if (errorFieldName !== null) {
          setError(errorFieldName, {
            type: "manual",
            message: errorMessage,
          });
        }
      } else {
        enqueueSnackbar("Error creating client", { variant: "error" });
      }
    },
  });
  const onSubmit = (data: CreateClient) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate(data);
  };
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <RHFTextField
              variant="standard"
              margin="normal"
              fullWidth
              label="Name"
              name="clientName"
              autoFocus
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <RHFTextField
              variant="standard"
              margin="normal"
              fullWidth
              label="Email"
              name="email"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <RHFTextField
              variant="standard"
              margin="normal"
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 6, display: "flex", justifyContent: "flex-end" }}>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Create
          </LoadingButton>
        </Box>
      </form>
    </FormProvider>
  );
}

export default ClientForm;
