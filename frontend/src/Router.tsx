import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { routePaths } from "./routerConfig";
import ErrorBoundary from "./components/layout/ErrorBoundary/ErrorBoundary";
import AuthGuard from "./components/AuthControl/AuthGuard";
import Layout from "./components/layout/Layout/Layout";
import ErrorFallback from "./components/layout/ErrorBoundary/ErrorFallback";
import ReservationsPage from "./components/pages/ReservationsPage/ReservationsPage";
import AuthenticationPage from "./components/pages/AuthenticationPage/AuthenticationPage";
import LedgersPage from "./components/pages/LedgersPage/LedgersPage";
import DashboardPage from "./components/pages/DashboardPage/DashboardPage";
import GuestGuard from "./components/AuthControl/GuestGuard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={routePaths.login.path}
        element={
          <GuestGuard>
            <ErrorBoundary>
              <AuthenticationPage />
            </ErrorBoundary>
          </GuestGuard>
        }
      />
      <Route
        path={routePaths.dashboard.path}
        index
        element={
          <ErrorBoundary>
            <DashboardPage />
          </ErrorBoundary>
        }
      />
      <Route
        element={
          <AuthGuard>
            <ErrorBoundary>
              <Layout />
            </ErrorBoundary>
          </AuthGuard>
        }
      >
        <Route path={routePaths.ledgers.path} element={<LedgersPage />} />
        <Route path={routePaths.ledgers.year} element={<LedgersPage />} />
        <Route
          path={routePaths.ledgers.yearAndLedgerId}
          element={<LedgersPage />}
        />
        <Route
          path={routePaths.reservations.path}
          element={<ReservationsPage />}
        />
        <Route
          path={routePaths.reservations.year}
          element={<ReservationsPage />}
        />
        <Route
          path={routePaths.reservations.yearAndReservationId}
          element={<ReservationsPage />}
        />
      </Route>
      {/* Catch-all for undefined routes */}
      <Route
        path={routePaths.notFound.path}
        element={<ErrorFallback errorMessage="wrongPath" />}
      />
      <Route path="*" element={<ErrorFallback errorMessage="wrongPath" />} />
    </>
  )
);

const Router = () => <RouterProvider router={router} />;

export default Router;
