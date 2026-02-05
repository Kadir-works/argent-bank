// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./store/authSlice";
import { getUserProfile } from "./services/userService";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import TransactionsPage from "./pages/TransactionsPage"; // ← NOUVEAU
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserProfile(token)
        .then(userData => {
          dispatch(
            loginSuccess({
              token: token,
              user: userData.body,
            })
          );
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, [dispatch]);

  return (
    <div className="app-layout">
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        {/* NOUVELLE ROUTE POUR LES TRANSACTIONS */}
        <Route 
          path="/accounts/:accountId/transactions" 
          element={<PrivateRoute><TransactionsPage /></PrivateRoute>} 
        />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;