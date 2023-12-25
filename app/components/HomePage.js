import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <>
    <div>This is Home Page</div>
    <Link href='/register'>Register</Link>
    </>
  )
}

export default Home