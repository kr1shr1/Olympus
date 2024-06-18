import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Login({ user, setUser }) {
  const navigate = useNavigate();

  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordChange = (event) => {
    event.preventDefault();
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const handleUsernameChange = (event) => {
    event.preventDefault();
    const newUsername = event.target.value;
    setUsername(newUsername);
  };

  const submitFunction = async (event) => {
    event.preventDefault();
    if (email.length < 8) {
      alert("Username must be at least 5 characters long.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    const userData = { email, password };
    console.log(userData)
    try {
      const res = await axios.post("http://localhost:3001/auth/login", userData);
      console.log(res.data)
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message)
    }

    setPassword("");
    setUsername("");
    // alert("Logged in successfully");
    // navigate('/dashboard');
  };

  return (
    <>
      <form onSubmit={submitFunction} className="flex justify-center items-center h-screen bg-slate-400">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-2xl">
          <div className="text-3xl font-bold text-center text-slate-600 mb-6">Login</div>
          <div className="space-y-4">
            <div className="flex flex-col">
              {/* <label htmlFor="username" className="text-sm font-semibold text-slate-700">Email</label> */}
              <input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={handleUsernameChange}
                className="input-login border-b-2 border-slate-100 py-2 px-3 focus:outline-none focus:border-slate-700 transition duration-300"
                required
              />
            </div>
            
            <div className="flex flex-col">
              {/* <label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</label> */}
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="input-login border-b-2 border-slate-100 py-2 px-3 focus:outline-none focus:border-slate-700 transition duration-300"
                required
              />
            </div>

            <button 
              type="submit"
              className="bg-slate-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Login
            </button>

            <div className="text-center text-slate-600 text-sm">
              Not having any account?  
              <Link to="/signup" className="text-slate-600 hover:underline font-semibold">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
