// import * as api from '@/api/user'
import { LoadingButtonSave } from "@/components/LoadingButton";
import RHFTextField from "@/components/RHF/RHFTextField";
import { getUserOptions } from "@/queries";
import { serviceUser } from "@/services/user";
import { UpdateUser, User, userSchema } from "@/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Typography } from "@mui/material";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "react-oidc-context";

function UserInfos() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const { data: user } = useSuspenseQuery(
    getUserOptions(auth.user?.access_token as string)
  );

  const { enqueueSnackbar } = useSnackbar();

  const formMethods = useForm<User>({
    values: {
      name: user?.name || "",
      email: user?.email || "",
    },
    resolver: zodResolver(userSchema),
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, isDirty },
    reset,
    getValues,
  } = formMethods;

  const mutation = useMutation({
    mutationFn: (data: UpdateUser) =>
      serviceUser.updateUser(auth.user?.access_token as string, data),
    onSuccess: () => {
      enqueueSnackbar("Profile updated", { variant: "success" });
      queryClient.invalidateQueries(
        getUserOptions(auth.user?.access_token as string)
      );
      reset(getValues());
    },
    onError: async (error: Error | Response) => {
      if (error instanceof Response && error.status === 409) {
        const data = await error.json();
        setError("name", {
          message: data.message,
        });
      } else {
        enqueueSnackbar("Error updating profile", { variant: "error" });
      }
    },
  });
  const onSubmit = (data: User) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate(data);
  };

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        User Information
      </Typography>
      <Typography variant="body2" gutterBottom>
        Update your personal information
      </Typography>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6} mt={3}>
            <RHFTextField
              variant="standard"
              margin="normal"
              fullWidth
              label="Company Name"
              name="name"
              autoFocus
            />

            <RHFTextField
              variant="standard"
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            <LoadingButtonSave
              type="submit"
              loading={isSubmitting || mutation.isPending}
              disabled={!isDirty || mutation.isPending}
              sx={{ alignSelf: "flex-end" }}
            >
              Save
            </LoadingButtonSave>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
}

export default UserInfos;
