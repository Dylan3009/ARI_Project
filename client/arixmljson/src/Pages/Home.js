import React from 'react'
import './Home.css'

const Home = () => {
  
  return (
    <div className="home">
      <h1>Text to JSON --- JSON to Text</h1>
      <a href="/convert/json">JSON to Text</a>
      <a href="/convert/json/text">Text to JSON</a>
      <h1>Text to XML --- XML to Text</h1>
      <a href="/convert/xml">XML to Text</a>
      <a href="/convert/xml/text">Text to XML</a>
    </div>
  )
}

export default Home