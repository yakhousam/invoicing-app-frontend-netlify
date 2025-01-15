import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import {
  Link as RouterLink,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";

const Breadcrumbs = () => {
  const matches = useRouterState({ select: (s) => s.matches });
  const router = useRouter(); // using useRouter alone doesn't refresh the component when the route changes

  const breadcrumbs = matches.at(-1)?.pathname.split("/").filter(Boolean) ?? [];

  const title = router.state.matches.at(-1)?.context?.getTitle?.();

  return (
    <MuiBreadcrumbs
      sx={{
        "& a": {
          textDecoration: "none",
          color: "inherit",
        },
        "& a:hover": {
          textDecoration: "underline",
        },
      }}
    >
      {breadcrumbs?.slice(0, -1).map((path) => {
        return (
          <RouterLink key={path} to={`/${path}` as any}>
            <Typography sx={{ textTransform: "capitalize" }}>{path}</Typography>
          </RouterLink>
        );
      })}

      <Typography sx={{ textTransform: "capitalize" }}>{title}</Typography>
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
