import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

//main screens
import Home from "./screens/main/Home";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import Pricing from "./screens/main/Pricing";
import Contact from "./screens/main/Contact";
import About from "./screens/main/About";
import Empty from "./screens/auth/Empty";
import Forgot from "./screens/auth/Forgot";
import NavBar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";

//user or dasboard
import ProtectedRoute1 from "./ProtectedRoute1";
import Dashboard from "./user/screens/Dashboard";
import Profile from "./user/screens/Profile";
import Payment from "./user/screens/Payment";
import Withdrawal from "./user/screens/Withdrawal";
import Invest from "./user/screens/Invest";
import Notifications from "./user/screens/Notifications";
import HistoryData from "./user/screens/History";

//admin screens
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import AdminProfile from "./admin/screens/Profile";
import AdminHome from "./admin/screens/main/AdminHome";
import AdminLogin from "./admin/screens/main/AdminLogin";
import Analytics from "./admin/screens/Analytic";
import AdminTransactions from "./admin/screens/transactions/Transactions";
import AdminTransactionEdit from "./admin/screens/transactions/AdminTransactionEdit";
import AdminUserEdit from "./admin/screens/users/UserEdit";
import AdminUserCreate from "./admin/screens/users/UserCreate";
import AdminUsers from "./admin/screens/users/AdminUsers";
import AdminContacts from "./admin/screens/main/Contacts";
import Subcribers from "./admin/screens/Subcribers";
import AdminNotifications from "./admin/screens/main/AdminNotifications";
import { useDispatch, useSelector } from "react-redux";
import useGetDocument from "./components/hooks/UseDocument";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAdminUser } from "./state/adminAuthSlice";
import { db } from "./database/firebaseDb";
import Verify from "./screens/auth/verify";
import ProtectedRouteV from "./ProtectRouteV";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Home />
            </>
          }
        ></Route>
        <Route path="/auth" element={<ProtectedRoute1 />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/account/verify"
          element={
            <ProtectedRouteV>
              <Verify />
            </ProtectedRouteV>
          }
        />

        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/auth/forgot" element={<Forgot />} />

        <Route path="/user" element={<ProtectedRoute />}>
          <Route path="messages" element={<Notifications />} />

          <Route path="history" element={<HistoryData />} />

          <Route index path="dashboard" element={<Dashboard />} />

          <Route path="profile" element={<Profile />} />

          <Route path="payment" element={<Payment />} />

          <Route path="plans" element={<Invest />} />

          <Route path="withdrawal" element={<Withdrawal />} />
        </Route>
        <Route path="/adm/login" element={<AdminLogin />} />
        <Route path="/adm" element={<ProtectedRouteAdmin />}>
          <Route path="messages" element={<AdminNotifications />} />

          <Route path="history" element={<HistoryData />} />

          <Route index element={<AdminHome />} />
          <Route path="analytics" element={<Analytics />} />

          <Route path="profile" element={<AdminProfile />} />

          <Route path="payment" element={<Payment />} />

          <Route path="subcribers" element={<Subcribers />} />
          <Route path="contacts" element={<AdminContacts />} />

          <Route path="transactions">
            <Route index element={<AdminTransactions />} />
            <Route path="edit/:id" element={<AdminTransactionEdit />} />
          </Route>
          <Route path="users">
            <Route index element={<AdminUsers />} />
            <Route path="edit/:id" element={<AdminUserEdit />} />
            <Route path="create" element={<AdminUserCreate />} />
          </Route>
        </Route>

        <Route path="/*" element={<Empty />} />
      </Routes>
    </Router>
  );
}

export default App;
