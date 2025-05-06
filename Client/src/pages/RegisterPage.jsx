// import React, { useState } from 'react';
// import axios from 'axios';

// function RegisterPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     try {
//       console.log("Sending data to backend:", { name, email, password });

//       const response = await axios.post(
//         'http://localhost:5001/api/auth/register',
//         {
//           name,
//           email,
//           password,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       console.log("Backend response:", response);
//       setMessage(`Success: ${response.data.message}`);
//       setName('');
//       setEmail('');
//       setPassword('');
//     } catch (error) {
//       if (error.response) {
//         console.error("Error response from backend:", error.response.data);
//         setMessage(`Error: ${error.response.data.error || 'Unknown error'}`);
//       } else if (error.request) {
//         console.error("No response from backend:", error.request);
//         setMessage('Error: No response from server. Is it running?');
//       } else {
//         console.error("Request error:", error.message);
//         setMessage(`Error: ${error.message}`);
//       }
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit} className="register-form">
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             placeholder="Enter your name"
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Enter your email"
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             minLength={6}
//             placeholder="Enter your password"
//           />
//         </div>
//         <button type="submit" className="register-button">Register</button>
//       </form>

//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// }

// export default RegisterPage;



import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css'; // Import the CSS file

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await axios.post(
        'http://localhost:5001/api/auth/register',
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setMessage(`Success: ${response.data.message}`);
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.error || 'Unknown error'}`);
      } else if (error.request) {
        setMessage('Error: No response from server. Is it running?');
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <h2 className="register-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="register-btn">Register</button>
        </form>
        {message && <p className="register-message">{message}</p>}
      </div>
    </div>
  );
}

export default RegisterPage;
