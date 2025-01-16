import { Invoice } from "@/validations";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Box, Button, CircularProgress } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import dayjs from "dayjs";
import InvoiceByIdPdf from "./InvoicePdf";
import { useAuth } from "react-oidc-context";
import { useQuery } from "@tanstack/react-query";
import { userSignatureOptions } from "@/queries";

const DownloadInvoiceBtn = (invoice: Invoice) => {
  const auth = useAuth();
  const {
    data: userSignatureUrl,
    isFetched,
    isLoading,
  } = useQuery(userSignatureOptions(auth.user?.id_token as string));
  return (
    <Box display="flex" justifyContent="flex-end">
      <PDFDownloadLink
        document={
          <InvoiceByIdPdf
            invoice={invoice}
            userSignatureUrl={userSignatureUrl}
          />
        }
        fileName={`${invoice.clientName}-${invoice.invoiceId}-${dayjs(invoice.invoiceDate).format("DD-MM-YYYY")}.pdf`}
      >
        {({ url }) =>
          isFetched && url ? (
            <Button variant="outlined" startIcon={<PictureAsPdfIcon />}>
              Download
            </Button>
          ) : (
            <CircularProgress />
          )
        }
      </PDFDownloadLink>
    </Box>
  );
};

export default DownloadInvoiceBtn;
