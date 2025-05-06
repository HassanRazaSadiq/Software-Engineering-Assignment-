// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './SavedSearches.css';

// const SavedSearchesPage = () => {
//   const [searches, setSearches] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSavedSearches = async () => {
//       try {
//         // Retrieve the token from localStorage
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('No token found. Please log in.');
//           return;
//         }

//         console.log('Token:', token); // Debug log to verify token

//         // Correctly passing the token in the Authorization header
//         const response = await axios.get("http://localhost:5001/api/search/saved-searches", {
//           headers: {
//             Authorization: `Bearer ${token}`, // Use the token retrieved from localStorage
//           },
//         });

//         // Check if the response data is in the expected format
//         if (response.data && response.data.savedSearches) {
//           setSearches(response.data.savedSearches);
//         } else {
//           setError('Invalid response structure.');
//         }
//       } catch (err) {
//         console.error('Error fetching saved searches:', err);
//         setError(err.response ? err.response.data.message : err.message);
//       }
//     };

//     fetchSavedSearches();
//   }, []);

//   return (
//     <div>
//       <h2>Saved Searches</h2>
      
//       {/* Show error message if there's an error */}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
      
//       {/* List saved searches if no error */}
//       {searches.length > 0 ? (
//         <ul>
//           {searches.map((search) => (
//             <li key={search.id}>{search.searchTerm}</li>
//           ))}
//         </ul>
//       ) : (
//         !error && <p>No saved searches found.</p>
//       )}
//     </div>
//   );
// };

// export default SavedSearchesPage;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './SavedSearches.css';

// const SavedSearchesPage = () => {
//   const [searches, setSearches] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchSavedSearches();
//   }, []);

//   const fetchSavedSearches = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) return setError('No token found. Please log in.');

//       const response = await axios.get("http://localhost:5001/api/search/saved-searches", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data?.savedSearches) {
//         setSearches(response.data.savedSearches);
//       } else {
//         setError('Invalid response structure.');
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError(err.response?.data?.message || err.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     try {
//       await axios.delete(`http://localhost:5001/api/search/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setSearches((prev) => prev.filter((item) => item.id !== id));
//     } catch (err) {
//       console.error('Delete error:', err);
//       alert('Failed to delete. Try again.');
//     }
//   };

//   return (
//     <div className="saved-searches-container">
//       <h2>Saved Searches</h2>

//       {error && <p className="error">{error}</p>}

//       {searches.length > 0 ? (
//         <ul>
//           {searches.map((search) => (
//             <li key={search.id} className="search-item">
//               {search.searchTerm}
//               <button onClick={() => handleDelete(search.id)} className="delete-btn">✕</button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         !error && <p className="no-results">No saved searches found.</p>
//       )}
//     </div>
//   );
// };

// export default SavedSearchesPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SavedSearches.css';

const SavedSearchesPage = () => {
  const [searches, setSearches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedSearches();
  }, []);

  const fetchSavedSearches = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return setError('No token found. Please log in.');

      const response = await axios.get("http://localhost:5001/api/search/saved-searches", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.savedSearches) {
        setSearches(response.data.savedSearches);
      } else {
        setError('Invalid response structure.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.delete(`http://localhost:5001/api/search/saved-searches/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      ;

      setSearches((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete. Try again.');
    }
  };

  return (
    <div className="saved-searches-container">
      <h2>Search History</h2>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {searches.length > 0 ? (
            <ul>
              {searches.map((search) => (
                <li key={search.id} className="search-item">
                  <span>{search.searchTerm}</span>
                  <button onClick={() => handleDelete(search.id)} className="delete-btn">✕</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-results">No saved searches found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default SavedSearchesPage;
