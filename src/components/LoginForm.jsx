import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async(e) => {
    e.preventDefault();
    const user = { email: username, password };


    if(username=="admin" && password==="admin123") {
      alert("Login successful");
      localStorage.setItem("token", "admin-token");
      localStorage.setItem("userRole", "admin");
      window.location.href = "/admin";
      return;
    }

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Login successful");
          localStorage.setItem("token", data.token);
          localStorage.setItem("userRole", "user");

          window.location.href = "/bookings";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error logging in");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">Sign in</h2>
        <p className="text-gray-500 text-center mb-6">
          Welcome back! Please enter your credentials.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white p-3 rounded-md font-semibold hover:opacity-80 transition"
          >
            Sign in
          </button>
        </form>

        {/* Terms & Privacy */}
        <p className="text-gray-500 text-center mt-6">
          By signing in, you agree to our{" "}
          <a href="#" className="text-blue-600 underline">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
