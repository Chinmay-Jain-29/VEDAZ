import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { User, Mail, Phone, FileText, Calendar, Clock, ChevronLeft, CheckCircle2 } from 'lucide-react';

const BookingPage = () => {
  const { expertId, date, timeSlot } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/bookings', {
        expertId,
        date,
        timeSlot: decodeURIComponent(timeSlot),
        ...formData
      });

      setSuccess(true);
      toast.success('Session booked successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to book session. The slot might be taken.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-8">
              Your session has been successfully scheduled. We've sent the details to your email.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/my-bookings')}
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
              >
                View My Bookings
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 px-4 bg-gray-50 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(`/expert/${expertId}`)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Available Slots
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header Summary */}
          <div className="bg-indigo-600 p-8 text-white">
            <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl flex-1 backdrop-blur-sm">
                <Calendar className="w-6 h-6 text-indigo-200" />
                <div>
                  <p className="text-sm text-indigo-200 font-medium mb-0.5">Date</p>
                  <p className="font-semibold text-lg">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl flex-1 backdrop-blur-sm">
                <Clock className="w-6 h-6 text-indigo-200" />
                <div>
                  <p className="text-sm text-indigo-200 font-medium mb-0.5">Time</p>
                  <p className="font-semibold text-lg">{decodeURIComponent(timeSlot)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all shadow-sm"
                    placeholder="YOUR NAME"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all shadow-sm"
                    placeholder="YOUR EMAIL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all shadow-sm"
                    placeholder="+91 1234567890"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="4"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all shadow-sm resize-none"
                    placeholder="Any specific topics you'd like to discuss?"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-md text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-indigo-200"
              >
                {loading ? 'Confirming Booking...' : 'Confirm Booking'}
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                By confirming, you agree to our terms of service and cancellation policy.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
