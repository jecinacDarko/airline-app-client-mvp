import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { NavBar } from "./components/NavBar";
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";
import { BookingPage } from './pages/BookingPage';
import { CreatedBookingPage } from './pages/CreatedBookingPage';

export default function App() {
  return (

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={< BookingPage/>} />
          <Route path="/myflights" element={<CreatedBookingPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
  );
}