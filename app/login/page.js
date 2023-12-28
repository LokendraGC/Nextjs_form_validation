'use client'

import { NextResponse } from 'next/server'
import React, {useState } from 'react'
import axios from 'axios'
import {useRouter} from "next/navigation";
 import { toast } from "react-toastify";


const page = () => {
  const router = useRouter();

  const hamdleSubmit = (e)=>{
    e.preventDefault();
     handleLogin();
  }

  const [user, setUser] = useState({
    email:'',
    password:'',
  })
  const [loading,setLoading] = useState(false)

  const handleLogin = async()=>{
      try{
        setLoading(true);
       const response =  await axios.post("/api/login", user)
 
        if (response.status == 200 && response.data.success) {
          router.push("/dashboard");
          toast.success("Logged in successfully") 
          
          console.log("On the way to dashboard");
        }else{
          console.log("Invalid username and password",response.data);
        }

      }catch(err){
        return NextResponse.json({
          message:"Can't connect to server",
          status: 404,
        })
      }finally{
        setLoading(false);
      }
  }

  const handleChange = (e)=>{
    console.log(e.target.value)
    setUser({...user, [e.target.name]:e.target.value})
  }

  return (
      <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">{loading?"Processing":"Login"}</h1>
        <form onSubmit={hamdleSubmit} required>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
            required
            onChange={handleChange}
              type="email"
              id="email"
              name="email"
              value={user.email}
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
            required
            onChange={handleChange}
              type="password"
              id="password"
              name="password"
              value={user.password}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          
          <button
          onClick={handleLogin}
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
            Login
          </button>
           
        </form>
      </div>
    </div>
  )
}

export default page