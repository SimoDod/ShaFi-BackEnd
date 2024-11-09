export const routePaths = {
  login: { label: "", path: "/login" },
  ledgers: {
    label: "navMenu.ledgers",
    path: "/ledgers/",
    year: "/ledgers/:year",
    yearAndLedgerId: "/ledgers/:year/:ledgerId",
    create: "/create",
  },
  dashboard: {
    label: "navMenu.dashboard",
    path: "/",
  },
  reservations: { label: "navMenu.reservations", path: "/reservations" },
  notFound: {
    path: "/404",
  },
} as const;
