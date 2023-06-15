import React from 'react'
import './Home.css'

const Home = () => {
  
  return (
    <div className="home">
      <h1>Text to JSON --- JSON to Text</h1>
      <a href="/convert/json">Text to JSON</a>
      <a href="/convert/json/text">JSON to Text</a>
      <h1>Text to XML --- XML to Text</h1>
      <a href="/convert/xml">Text to XML</a>
      <a href="/convert/xml/text">XML to Text</a>
    </div>
  )
}

export default Home