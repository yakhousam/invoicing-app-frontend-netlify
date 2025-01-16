// import PasswordUpdate from "@/components/settings/PasswordUpdate";
import Signature from '@/components/settings/Signature'
import UserInfos from '@/components/settings/UserInfos'
import { userSignatureOptions } from '@/queries'
import { Box, Paper } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/settings')({
  beforeLoad: () => ({}),
  loader: ({ context }) =>
    context.queryClient?.ensureQueryData(
      userSignatureOptions(context.auth?.user?.id_token as string),
    ),
  component: () => <Settings />,
})

function Settings() {
  return (
    <>
      <Wrapper>
        <UserInfos />
      </Wrapper>
      <Box sx={{ mt: 4 }} />
      <Wrapper>
        <Signature />
      </Wrapper>
      <Box sx={{ mt: 4 }} />
      {/* <Wrapper>
        <PasswordUpdate />
      </Wrapper> */}
    </>
  )
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        maxWidth: (theme) => theme.breakpoints.values.sm,
        margin: 'auto',
      }}
    >
      <Paper sx={{ px: 4, py: 2 }}>{children}</Paper>
    </Box>
  )
}
