import React from 'react'
import './Home.css'

const Home = () => {

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    console.log(file);
    console.log(formData);

    fetch('http://localhost:3001/convert/json', {
      method: 'POST',
      body: formData,
      withCredentials: true,    
      crossorigin: true,    
      mode: 'no-cors',  
    }).then(response => {
      if (response.ok) {
        console.log('Archivo enviado con éxito');
      } else {
        console.error('Error al enviar el archivo');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="home">
      <h1>Text to JSON --- JSON to Text</h1>
      <label htmlFor="textJson-btn" className="convert-button">Text to JSON</label>
      <input id='textJson-btn' type='file' onChange={handleFileChange}></input>
      <label htmlFor="json-btn" className="convert-button">JSON to Text</label>
      <input id='json-btn' type='file' onChange={handleFileChange}></input>
      <h1>Text to XML --- XML to Text</h1>
      <label htmlFor="textXml-btn" className="convert-button">Text to XML</label>
      <input id='textXml-btn' type='file' onChange={handleFileChange}></input>
      <label htmlFor="xml-btn" className="convert-button">XML to Text</label>
      <input id='xml-btn' type='file' onChange={handleFileChange}></input>
    </div>
  )
}

export default Home