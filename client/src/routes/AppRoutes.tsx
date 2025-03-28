/* eslint-disable @typescript-eslint/no-unused-vars */
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import VoucherList from "../pages/VoucherList";
import VoucherGenerator from "../pages/VoucherGenerator";
import NotFound from "../pages/NotFound";

import PrivateRoute from "./PrivateRoute";

// AppRoutes component that defines the application's routing structure
const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes with AuthLayout */}
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      {/* Routes with MainLayout */}
      <Route
        path="*"
        element={
          <MainLayout>
            <Routes>
              {/* Protected routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/voucher-list" element={<VoucherList />} />
                <Route path="/voucher-generator" element={<VoucherGenerator />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
