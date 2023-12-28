import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="bg-gray-300 h-16 ">
      <ul className="flex  justify-end gap-12 p-5 h-16">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">SignUp</Link>
      </ul>
    </div>
  );
}

export default Navbar