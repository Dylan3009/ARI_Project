import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./TextToJson.css";
import "./TextToXml.css";

const TextToJson = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [textFile, setTextFile] = useState("");
  const [xmlFile, setXmlFile] = useState("");
  const [downloadLink, setDownloadLink] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const [encryptionKey, setEncryptionKey] = useState("");

  const handleKeyChange = (event) => {
    setEncryptionKey(event.target.value);
  };
  

  const handleFileUpload = async (key) => {
    if (!selectedFile) {
      console.error("No se ha seleccionado ningún archivo");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("key", key);

      const response = await axios.post(
        "http://localhost:3001/convert/text/xml",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Archivo enviado con éxito");

      const convertedData = response.data;

      setXmlFile(convertedData, null, 2);

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setTextFile(content);
      };
      reader.readAsText(selectedFile);

      const downloadUrl = URL.createObjectURL(
        new Blob([convertedData], {
          type: "application/xml",
        })
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
      saveAs(downloadLink, selectedFile.name.replace(".txt", ".xml"));
    }
  };

  return (
    <div>
      <div className="divjtt">
        <h1>Text to XML</h1>
        <input
          id="textJson-btn"
          type="file"
          onChange={handleFileChange}
        ></input>
        <button
          className="convert-button"
          onClick={() => {
            handleOpenModal();
          }}
        >
          Text to XML
        </button>
        {/* Modal */}
        {showModal && (
          <div className="modal">
            <h2>Ingrese la clave para cifrar la tarjeta de crédito</h2>
            <input
              type="password"
              value={encryptionKey}
              onChange={handleKeyChange}
            />
            <button
              onClick={() => {
                handleFileUpload(encryptionKey);
              }}
            >
              Aceptar
            </button>
          </div>
        )}
        <div className="textarea-content">
          <textarea
            className="textarea1"
            placeholder="Aquí se mostrará el texto en txt"
            value={textFile}
            readOnly
          ></textarea>
          <textarea
            className="textarea2"
            placeholder="Aquí se mostrará el texto en json"
            value={xmlFile}
            readOnly
          ></textarea>
        </div>
        <button
          className="convert-button download-button"
          onClick={handleDownloadFile}
        >
          Descargar
        </button>
      </div>
    </div>
  );
};

export default TextToJson;
