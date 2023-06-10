import React from 'react'
import './Home.css'

const Home = () => {
  
  const handleClick = () => {
    fetch('http://localhost:3001/generate', {
      method: 'GET',
    }, [])
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="home">
      <h1>Text to JSON --- JSON to Text</h1>
      {/* <a className='generate-button' href="/">Generate</a> */}
      <label for="textJson-btn" class="convert-button">Text to JSON</label>
      <input id='textJson-btn' type='file' onClick={handleClick}></input>
      <label for="json-btn" class="convert-button">JSON to Text</label>
      <input id='json-btn' type='file' onClick={handleClick}></input>
      <h1>Text to XML --- XML to Text</h1>
      {/* <a className='generate-button' href="/">Generate</a> */}
      <label for="textXml-btn" class="convert-button">Text to XML</label>
      <input id='textXml-btn' type='file' onClick={handleClick}></input>
      <label for="xml-btn" class="convert-button">XML to Text</label>
      <input id='xml-btn' type='file' onClick={handleClick}></input>
    </div>
  )
}

export default Home