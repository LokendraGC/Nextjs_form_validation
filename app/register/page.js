"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const Register = () => {
  const router = useRouter();
  

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });


  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  console.log(formData.password);
  if (
    formData.password.length > 0 &&
    formData.password === formData.password2 &&
    formData.password2
  ) {
    console.log("Your registration has been successfully done!");
  } else {
    console.log("Please enter a correct password and username");
  }


  const handleRegister = async() => {
    try {
      setLoading(true);
     const response = await axios.post(
       "api/register",
       formData
     );
      console.log("Signup success", response);
      
      if(response.status === 200){
       router.push("/login");
     }

    } catch (err) {
      console.log("signup failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">
          {loading ? "loading" : "Register"}
        </h1>
        <form onSubmit={handleSubmit} required >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              onChange={handleChange}
              required
              type="text"
              id="username"
              value={formData.username}
              name="username"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              required
              type="email"
              id="email"
              value={formData.email}
              name="email"
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              onChange={handleChange}
              required
              type="password"
              id="password"
              name="password"
              value={formData.password}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm password
            </label>
            <input
              onChange={handleChange}
              required
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          {/* <Link href="/login"> */}
          <button
            onClick={handleRegister}
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
