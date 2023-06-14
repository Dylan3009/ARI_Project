import React, {useState} from 'react'
import axios from 'axios'
import './Home.css'

const Home = () => {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      console.error('No se ha seleccionado ningún archivo');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      await axios.post('http://localhost:3001/convert/json', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
          // 'Content-Type': 'text/plain'
        }
      });
      console.log('Archivo enviado con éxito');
    } catch (error) {
      console.error('Error al enviar el archivo:', error.message);
    }
  };

  const goToNextPage = () => {
    axios.get('http://localhost:3001/convert/json')
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  };
  
  return (
    <div className="home">
      <h1>Text to JSON --- JSON to Text</h1>
      <label htmlFor="textJson-btn" className="convert-button">Text to JSON</label>
      <input id='textJson-btn' type='file' onChange={handleFileChange}></input>
      <button onClick={handleFileUpload}>JSON to Text</button>
      <label htmlFor="json-btn" className="convert-button">JSON to Text</label>
      <input id='json-btn' type='file' onChange={handleFileChange}></input>
      <h1>Text to XML --- XML to Text</h1>
      <label htmlFor="textXml-btn" className="convert-button">Text to XML</label>
      <input id='textXml-btn' type='file' onChange={handleFileChange}></input>
      <label htmlFor="xml-btn" className="convert-button">XML to Text</label>
      <input id='xml-btn' type='file' onChange={handleFileChange}></input>
      <a href="/convert/json" onClick={goToNextPage}>Pasar a la otra XD</a>
    </div>
  )
}

export default Home