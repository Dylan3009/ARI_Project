import React, { useState } from 'react'
import axios from 'axios'
import { saveAs } from 'file-saver';
import './TextToJson.css'

const TextToJson = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [textFile, setTextFile] = useState('');
    const [jsonFile, setJsonFile] = useState('');
    const [downloadLink, setDownloadLink] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const [encryptionKey, setEncryptionKey] = useState("");
    const [delimiter, setDelimiter] = useState(";");

    const handleKeyChange = (event) => {
        setEncryptionKey(event.target.value);
    };

    const handleDelimiter = (event) => {
        setDelimiter(event.target.value);
        console.log(event.target.value);
    };

    const handleFileUpload = async (key, delimiter) => {
        if (!selectedFile) {
            console.error('No se ha seleccionado ningún archivo');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append("key", key);
            formData.append("delimiter", delimiter);

            const response = await axios.post('http://localhost:3001/convert/json', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Archivo enviado con éxito');

            const convertedData = response.data;

            setJsonFile(JSON.stringify(convertedData, null, 2))

            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                setTextFile(content);
            };
            reader.readAsText(selectedFile);

            const downloadUrl = URL.createObjectURL(
                new Blob([JSON.stringify(convertedData, null, 2)], {
                    type: 'application/json'
                })
            );
            setDownloadLink(downloadUrl);

        } catch (error) {
            console.error('Error al enviar el archivo:', error.message);
        }

        setShowModal(false);
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

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
                <button
                    className='convert-button'
                    onClick={() => {
                        handleOpenModal();
                    }}
                >Text to JSON
                </button>
                {showModal && (
                    <div className="modal">
                        <h2>Ingrese la clave para cifrar la tarjeta de crédito</h2>
                        <input
                            type="password"
                            value={encryptionKey}
                            onChange={handleKeyChange}
                        />
                        <select
                            value={delimiter}
                            onChange={handleDelimiter}>
                            <option value=";">;</option>
                            <option value=",">,</option>
                        </select>
                        <button
                            onClick={() => {
                                handleFileUpload(encryptionKey, delimiter);
                            }}
                        >
                            Aceptar
                        </button>
                    </div>
                )}
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
                        value={jsonFile}
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