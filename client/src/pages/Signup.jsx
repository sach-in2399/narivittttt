

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Signup.css';

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password || !confirmPassword) {
//       setError('Please fill in all fields.');
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5001/register', {
//         email,
//         password,
//       });
//       alert(response.data.message); // Show success message
//       navigate('/login'); // Redirect to login page
//     } catch (error) {
//       // Handle network errors or server errors
//       if (error.response) {
//         // Server responded with a status code outside 2xx
//         setError(error.response.data.message || 'An error occurred');
//       } else if (error.request) {
//         // The request was made but no response was received
//         setError('No response from the server. Please try again.');
//       } else {
//         // Something happened in setting up the request
//         setError('An unexpected error occurred. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Signup</h2>
//         {error && <p className="error">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Confirm Password:</label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Signup</button>
//         </form>
//         <p>
//           Already have an account? <span onClick={() => navigate('/login')}>Login</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;



// import React, { useState } from "react";

// const Signup = () => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5002/api/users/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Signup successful!");
//       } else {
//         alert(`Error: ${data.message}`);
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       alert("Signup failed. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5002/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signup</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Signup</button>
        </form>
        <p>
          Already have an account? <span onClick={() => navigate("/login")} className="login-link">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
