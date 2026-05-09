import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import socket from '../socket/socket';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import SlotButton from '../components/SlotButton';
import { Star, Award, ChevronLeft, Calendar } from 'lucide-react';

const ExpertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpert = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/experts/${id}`);
        setExpert(data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch expert details');
      } finally {
        setLoading(false);
      }
    };

    fetchExpert();
  }, [id]);

  useEffect(() => {
    // Listen for real-time slot bookings
    const handleSlotBooked = (data) => {
      if (data.expertId === id) {
        setExpert((prevExpert) => {
          if (!prevExpert) return prevExpert;
          
          // Remove the booked slot from the state
          const updatedSlots = prevExpert.availableSlots.map(day => {
            if (day.date === data.date) {
              return {
                ...day,
                slots: day.slots.filter(slot => slot !== data.timeSlot)
              };
            }
            return day;
          });

          return {
            ...prevExpert,
            availableSlots: updatedSlots
          };
        });
      }
    };

    socket.on("slotBooked", handleSlotBooked);

    return () => {
      socket.off("slotBooked", handleSlotBooked);
    };
  }, [id]);

  const handleSlotClick = (date, slot) => {
    navigate(`/book/${id}/${date}/${encodeURIComponent(slot)}`);
  };

  if (loading) return <div className="min-h-screen bg-gray-50"><Navbar /><Loader /></div>;
  if (error) return <div className="min-h-screen bg-gray-50"><Navbar /><div className="max-w-3xl mx-auto mt-8"><ErrorMessage message={error} /></div></div>;
  if (!expert) return <div className="min-h-screen bg-gray-50"><Navbar /><div className="max-w-3xl mx-auto mt-8"><ErrorMessage message="Expert not found" /></div></div>;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Experts
        </button>

        {/* Expert Info Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{expert.name}</h1>
                <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 font-semibold rounded-full">
                  {expert.category}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-lg font-bold text-yellow-700">{expert.rating}</span>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {expert.bio}
            </p>

            <div className="flex items-center gap-2 text-gray-700 font-medium bg-gray-50 inline-flex px-4 py-2 rounded-xl">
              <Award className="w-5 h-5 text-indigo-500" />
              <span>{expert.experience} Years of Professional Experience</span>
            </div>
          </div>
        </div>

        {/* Available Slots Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <Calendar className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Available Sessions</h2>
              <p className="text-gray-500">Select a time slot to proceed with booking</p>
            </div>
          </div>

          <div className="space-y-8">
            {expert.availableSlots && expert.availableSlots.length > 0 ? (
              expert.availableSlots.map((day) => (
                <div key={day.date} className="animate-fade-in">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 bg-gray-50 px-4 py-2 rounded-lg inline-block">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  
                  {day.slots && day.slots.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {day.slots.map((slot) => (
                        <SlotButton
                          key={`${day.date}-${slot}`}
                          slot={slot}
                          isSelected={false}
                          onClick={() => handleSlotClick(day.date, slot)}
                          disabled={false}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No slots available on this date.</p>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <p className="text-gray-500 font-medium">No available slots at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetail;
