import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the updated CSS

function HomePage() {
  return (
    <div className="home-container">
      <div className="overlay"></div> {/* New overlay for better text visibility */}
      
      <div className="home-content">
        <h1 className="home-title">Welcome Back! 👋</h1>
        <p className="home-text">
          You are successfully logged in and ready to explore the world of creativity!
        </p>

        <div className="home-actions">
          <p className="home-subtext">Ready to search through Openverse?</p>
          <Link to="/search" className="home-button">🔍 Go to Search Page</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
