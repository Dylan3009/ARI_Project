import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./XmlToText.css";

const XmlToTxt = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [xmlFile, setXmlFile] = useState("");
  const [txtFile, setTxtFile] = useState("");
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

  const handleFileUpload = async (key,delimiter) => {
    if (!selectedFile) {
      console.error("No se ha seleccionado ningún archivo");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("key", key);
      formData.append("delimiter",delimiter);

      const response = await axios.post(
        "http://localhost:3001/convert/txt",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Archivo enviado con éxito");

      const convertedData = response.data;
      setTxtFile(convertedData);

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setXmlFile(content);
      };
      reader.readAsText(selectedFile);

      const downloadUrl = URL.createObjectURL(
        new Blob([convertedData], { type: "text/plain" })
      );
      setDownloadLink(downloadUrl);
    } catch (error) {
      console.error("Error al enviar el archivo:", error.message);
    }
      // Cerrar el modal
      setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleDownloadFile = () => {
    if (downloadLink) {
      saveAs(downloadLink, selectedFile.name.replace(".xml", ".txt"));
    }
  };

  return (
    <div>
      <div className="divjtt">
        <h1>XML to Text</h1>
        <input id="xml-btn" type="file" onChange={handleFileChange} />
        <button
          className="convert-button"
          onClick={() => {
            handleOpenModal();
          }}
        >
          Convert to Text
        </button>
        {/* Modal */}
        {showModal && (
          <div className="modal">
            <h2>Ingrese la clave para descifrar la tarjeta de crédito</h2>
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
                handleFileUpload(encryptionKey,delimiter);
              }}
            >
              Aceptar
            </button>
          </div>
        )}
        <div className="textarea-content">
          <textarea
            className="textarea1"
            placeholder="Aquí se mostrará el texto en xml"
            value={xmlFile}
            readOnly
          ></textarea>
          <textarea
            className="textarea2"
            placeholder="Aquí se mostrará el texto en txt"
            value={txtFile}
            readOnly
          />
        </div>
        <button
          className="convert-button download-button"
          onClick={handleDownloadFile}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default XmlToTxt;
