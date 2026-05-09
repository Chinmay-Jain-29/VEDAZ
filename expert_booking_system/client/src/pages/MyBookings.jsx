import React, { useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { Calendar, Clock, User, CheckCircle2, AlertCircle, Clock3 } from 'lucide-react';

const MyBookings = () => {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      setHasSearched(true);
      const { data } = await api.get(`/bookings?email=${encodeURIComponent(email)}`);
      setBookings(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-sm font-semibold rounded-full border border-green-100">
            <CheckCircle2 className="w-4 h-4" />
            Confirmed
          </span>
        );
      case 'Completed':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full border border-blue-100">
            <CheckCircle2 className="w-4 h-4" />
            Completed
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-700 text-sm font-semibold rounded-full border border-yellow-100">
            <Clock3 className="w-4 h-4" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">My Bookings</h1>
          <p className="text-gray-600">Enter your email address to view all your upcoming and past sessions.</p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <SearchBar 
            searchTerm={email} 
            setSearchTerm={setEmail} 
            placeholder="Enter your email address..." 
          />
          <button
            type="submit"
            disabled={!email || loading}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Find Bookings'}
          </button>
        </form>

        {loading && <Loader />}
        
        {error && <ErrorMessage message={error} />}

        {!loading && !error && hasSearched && bookings.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 border-dashed">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500">We couldn't find any sessions booked with this email address.</p>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Sessions ({bookings.length})</h2>
            
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  
                  <div className="flex-grow space-y-4 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {booking.expertId?.name || "Unknown Expert"}
                        </h3>
                        <span className="text-indigo-600 text-sm font-medium">
                          {booking.expertId?.category || "Unknown Category"}
                        </span>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-gray-800">
                          {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-gray-800">{booking.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 sm:col-span-2">
                        <User className="w-5 h-5 text-gray-400" />
                        <span>Booked for: <span className="font-medium text-gray-800">{booking.name}</span></span>
                      </div>
                    </div>
                    
                    {booking.notes && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-600"><span className="font-medium">Your Notes:</span> {booking.notes}</p>
                      </div>
                    )}
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
