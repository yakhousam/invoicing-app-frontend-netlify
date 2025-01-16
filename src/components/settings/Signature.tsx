import { LoadingButtonSave } from "@/components/LoadingButton";
import { VisuallyHiddenInput } from "@/components/VisuallyHiddenInput";
import { userSignatureOptions } from "@/queries";
import { serviceUser } from "@/services/user";
import {
  Button,
  CircularProgress,
  Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useAuth } from "react-oidc-context";

const Signature = () => {
  const auth = useAuth();
  const idToken = auth.user?.id_token as string;

  const { data: userSignatureUrl, isLoading: isLoadingSignature } =
    useSuspenseQuery(userSignatureOptions(idToken));

  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isLoading },
  } = useForm<{
    signature: FileList | undefined;
  }>({
    defaultValues: {
      signature: undefined,
    },
  });

  const fileList = watch("signature");
  let preview;
  if (fileList && fileList.length > 0) {
    preview = URL.createObjectURL(fileList[0]);
  }

  const onSubmit = (data: { signature: FileList | undefined }) => {
    if (mutation.isPending) {
      return;
    }
    if (data.signature) {
      mutation.mutate(data.signature[0]);
    }
  };

  const mutation = useMutation({
    mutationFn: (data: File) => serviceUser.uploadSignature(data, idToken),
    onSuccess: () => {
      enqueueSnackbar("Signature updated", { variant: "success" });
      reset();
    },
    onError: async (error) => {
      console.log("onError", error);
      enqueueSnackbar("Error updating signature", { variant: "error" });
    },
  });

  const img = preview || userSignatureUrl;
  console.log("fileList", fileList);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" fontWeight="bold">
        Signature
      </Typography>
      <Typography variant="body2" gutterBottom>
        Update your signature
      </Typography>
      <Grid container spacing={3} alignItems="center" mt={3}>
        <Grid size={{ xs: 12, md: 7 }} minHeight={200}>
          {isLoadingSignature ? (
            <CircularProgress size={24} />
          ) : (
            <img alt="signature" src={img} width="100%" />
          )}
        </Grid>
        <Grid container justifyContent="flex-end" size={{ xs: 12, md: 5 }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            size="small"
          >
            select your signature
            <VisuallyHiddenInput
              type="file"
              accept=".png, .jpeg, .jpg"
              {...register("signature")}
            />
          </Button>
        </Grid>
      </Grid>
      <Stack alignItems="flex-end" mt={3}>
        <LoadingButtonSave
          type="submit"
          loading={isLoading}
          disabled={!fileList?.length || isLoadingSignature || isLoading}
        />
      </Stack>
    </form>
  );
};

export default Signature;
