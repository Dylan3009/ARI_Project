import React, { useState } from 'react'
import axios from 'axios'
import { saveAs } from 'file-saver';
import './TextToJson.css'

const TextToJson = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [textFile, setTextFile] = useState('');
    const [xmlFile, setXmlFile] = useState('');
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

            const response = await axios.post('http://localhost:3001/convert/text/xml', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Archivo enviado con éxito');

            const convertedData = response.data;

            setXmlFile(convertedData, null, 2);

            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                setTextFile(content);
            };
            reader.readAsText(selectedFile);

            const downloadUrl = URL.createObjectURL(
                new Blob([convertedData, null, 2], {
                    type: 'application/json'
                })
            );
            setDownloadLink(downloadUrl);

        } catch (error) {
            console.error('Error al enviar el archivo:', error.message);
        }
    };

    // const handleDownloadFile = () => {
    //     if (downloadLink) {
    //       const a = document.createElement('a');
    //       a.href = downloadLink;
    //       a.download = selectedFile.name.replace('.txt', '.json');
    //       a.click();
    //     }
    //   }; 

    const handleDownloadFile = () => {
        if (downloadLink) {
          saveAs(downloadLink, selectedFile.name.replace('.txt', '.json'));
        }
    };


    return (
        <div>
            <div className='divjtt'>
                <h1>Text to JSON</h1>
                <input id='textJson-btn' type='file' onChange={handleFileChange}></input>
                <button className='convert-button' onClick={handleFileUpload}>Text to JSON</button>
                <div className='textarea-content'>
                    <textarea
                        className='textarea1'
                        placeholder='Aquí se mostrará el texto en txt'
                        value={textFile}
                        readOnly
                    >
                    </textarea>
                    <textarea
                        className='textarea2'
                        placeholder='Aquí se mostrará el texto en json'
                        value={xmlFile}
                        readOnly
                    >
                    </textarea>
                </div>
                <button className='convert-button download-button' onClick={handleDownloadFile}>Descargar</button>
            </div>
        </div>
    )
}

export default TextToJson