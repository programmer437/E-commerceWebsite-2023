import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Layout>
      <div className='pnf'>
        <h1 className='text-center '>404</h1>
        <h2 className='text-center'>Oops Page not found</h2>
        <Link to="/" className="pnf-btn text-center">
          Go to Home
        </Link>
        </div>
    </Layout>
  )
}

export default PageNotFound;