import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ExpertListing from './pages/ExpertListing';
import ExpertDetail from './pages/ExpertDetail';
import BookingPage from './pages/BookingPage';
import MyBookings from './pages/MyBookings';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar will go here */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<ExpertListing />} />
          <Route path="/expert/:id" element={<ExpertDetail />} />
          <Route path="/book/:expertId/:date/:timeSlot" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
