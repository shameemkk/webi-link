import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Events from "./components/Events/Events";
import About from "./components/Home/About";
import Contact from "./components/Home/Contact";
import Navbar from "./components/Home/Navbar";
import "./App.css";
import Home from "./pages/Home";
import Footer from "./components/Home/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetails from "./pages/EventDetails";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import PaymentSuccess from "./components/Payment/PaymentSuccess";
import PaymentCancel from "./components/Payment/PaymentCancel";



function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/events"
            element={
              <PrivateRoute>
                <Events />
              </PrivateRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/event-details/:id" element={<EventDetails />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="payment/success"
            element={
              <PrivateRoute>
                <PaymentSuccess />
              </PrivateRoute>
            }
          />
          <Route
            path="payment/cancel"
            element={
              <PrivateRoute>
                <PaymentCancel />
              </PrivateRoute>
            }
          />
        
          
        </Routes>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
