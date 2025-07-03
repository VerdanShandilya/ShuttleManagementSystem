import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ onSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const user = { email:username, password };

    // Perform sign-up logic here (e.g., API call)

    const response= await fetch("https://shuttlemanagementsystem.onrender.com/signup", {
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
        alert("User created successfully");
        console.log("User created successfully", data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error creating user");
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-2">Create an account</h2>
        <p className="text-gray-500 text-center mb-6">
          Create an account to use our services.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:opacity-80 transition"
          >
            Sign in
          </button>
        </form>

        {/* Terms & Privacy */}
        <p className="text-gray-500 text-sm text-center mt-4">
          By creating an account, you agree to the{" "}
          <a href="#" className="text-black font-medium underline">
            Terms of use
          </a>{" "}
          and{" "}
          <a href="#" className="text-black font-medium underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
