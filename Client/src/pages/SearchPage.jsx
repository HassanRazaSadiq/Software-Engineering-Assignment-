// client/src/pages/SearchPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // To get the authenticated axios instance
import './SearchPage.css'; // Import your CSS styles
import { FaSearch } from 'react-icons/fa'; 

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]); // Store search results
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authAxios } = useAuth(); // Get the pre-configured axios instance

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!searchTerm.trim()) return; // Don't search if input is empty

    setIsLoading(true);
    setError(null);
    setResults([]); // Clear previous results

    try {
      // Use authAxios to make the authenticated request to our backend proxy
      // Our backend route is mounted at /api/search and the specific endpoint is /openverse
      const response = await authAxios.get(`/search/openverse?q=${encodeURIComponent(searchTerm)}`);

      // Assuming the backend sends back the 'results' array from Openverse
      // Check the actual structure of response.data based on Openverse API and your backend proxy
      if (response.data && response.data.results) {
          setResults(response.data.results);
      } else {
          // Handle cases where the structure might be different or empty
          console.warn("Received data structure might be different:", response.data);
          setResults([]); // Ensure results is an array
      }

    } catch (err) {
      console.error("Search failed:", err.response?.data || err.message);
      setError(err.response?.data?.details || err.message || 'Failed to fetch search results.');
      setResults([]); // Clear results on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-page-container">
      <h2 className="search-title">Search Openverse Media</h2>
  
      <form className="styled-search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for images, audio..."
          required
          className="search-input"
        />
        <button type="submit" disabled={isLoading} className="search-btn">
          <FaSearch /> {/* Using the FaSearch icon here */}
        </button>
      </form>
  
      {error && <p className="error-text">Error: {error}</p>}
  
      <div className="search-results">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={item.id} className="search-result-card">
              {item.url && item.frontend_media_type === 'image' && (
                <img
                  src={item.thumbnail || item.url}
                  alt={item.title || 'Openverse Image'}
                  className="result-image"
                />
              )}
              {item.url && item.frontend_media_type === 'audio' && (
                <audio controls src={item.url} className="result-audio">
                  Your browser does not support the audio element.
                </audio>
              )}
               <div className="search-results">
          {results.map((img) => (
            <div key={img.id} className="search-result-card">
              <img src={img.thumbnail} alt={img.title || 'Image'} className="result-image" />
              <div className="result-info">
                <p><strong>Title:</strong> {img.title || 'Untitled'}</p>
                <p><strong>Creator:</strong> {img.creator || 'Unknown'}</p>
                <p><strong>License:</strong> <a href={img.license_url} target="_blank" rel="noreferrer">{img.license}</a></p>
                <p><a href={img.foreign_landing_url} target="_blank" rel="noreferrer">View Source</a></p>
              </div>
            </div>
          ))}
        </div>
            </div>
          ))
        ) : (
          !isLoading && <p className="no-results">No results found, or start a new search.</p>
        )}
      </div>
    </div>
  );
  
}

export default SearchPage;


