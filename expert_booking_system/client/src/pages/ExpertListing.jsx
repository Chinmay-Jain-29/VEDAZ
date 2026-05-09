import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import ExpertCard from '../components/ExpertCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const categories = ["All", "Fitness", "Career", "Mental Health", "Technology", "Business"];

const ExpertListing = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounce search term
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    setPage(1); // Reset to page 1 on category change
  }, [category]);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);
        const queryCategory = category === 'All' ? '' : category;
        const { data } = await api.get(`/experts?page=${page}&limit=6&search=${debouncedSearch}&category=${queryCategory}`);
        
        setExperts(data.experts);
        setTotalPages(data.totalPages);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch experts');
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, [page, debouncedSearch, category]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Find Your Perfect Expert</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Book a 1-on-1 session with top professionals and get the guidance you need.</p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search experts by name..." />
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : experts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No experts found</h3>
            <p className="text-gray-500">Try adjusting your search or category filters.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experts.map((expert) => (
                <ExpertCard key={expert._id} expert={expert} />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
};

export default ExpertListing;
