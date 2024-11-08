export const routePaths = {
  authentication: { label: "", path: "/authentication" },
  dashboard: {
    label: "navMenu.dashboard",
    path: "/",
    year: "/:year",
    yearAndLedgerId: "/:year/:ledgerId",
    create: "/create",
  },
  reservations: { label: "navMenu.reservations", path: "/reservations" },
  notFound: {
    path: "/404",
  },
} as const;
