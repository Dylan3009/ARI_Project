import React from 'react'
import './Home.css'
import Transform from '../components/Transform/Transform'

const Home = () => {
  return (
    <div className="home">
      <h1>Data to JSON</h1>
      <Transform />
      <h1>Data to XML</h1>
      <Transform />
    </div>
  )
}

export default Home