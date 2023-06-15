import React, { useState } from 'react'
import axios from 'axios'
import { saveAs } from 'file-saver';
import './JsonToText.css'

const JsonToText = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [textFile, setTextFile] = useState('');
  const [jsonFile, setJsonFile] = useState('');
  const [downloadLink, setDownloadLink] = useState(null);

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

          const response = await axios.post('http://localhost:3001/convert/json/text', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          console.log('Archivo enviado con éxito');

          const convertedData = response.data;

          setJsonFile(JSON.stringify(selectedFile, null, 2))

          const reader = new FileReader();
          reader.onload = (e) => {
              const content = e.target.result;
              setTextFile(content);
          };
          reader.readAsText(convertedData);

          // const downloadUrl = URL.createObjectURL(
          //     new Blob([JSON.stringify(convertedData, null, 2)], {
          //         type: 'application/json'
          //     })
          // );
          // setDownloadLink(downloadUrl);

          const downloadUrl = URL.createObjectURL(
            new Blob([convertedData], {
                type: 'text/plain'
            })
          );
          setDownloadLink(downloadUrl);

      } catch (error) {
          console.error('Error al enviar el archivo:', error.message);
      }
  };

  const handleDownloadFile = () => {
      if (downloadLink) {
        saveAs(downloadLink, selectedFile.name.replace('.json', '.txt'));
      }
  };

  return (
    <div>
      <div className='divjtt'>
        <h1>JSON to Text</h1>
        <input id='json-btn' type='file' onChange={handleFileChange}></input>
        <button className='convert-button' onClick={handleFileUpload}>JSON to Text</button>
        <div className='textarea-content'>
          <textarea
            className='textarea1'
            placeholder='Aquí se mostrará el texto en json'
            value={jsonFile}
            readOnly
          >
          </textarea>
          <textarea
            className='textarea2'
            placeholder='Aquí se mostrará el texto en txt'
            value={textFile}
            readOnly
          >
          </textarea>
        </div>
        <button className='convert-button download-button' onClick={handleDownloadFile}>Descargar</button>
      </div>
    </div>
  )
}

export default JsonToText