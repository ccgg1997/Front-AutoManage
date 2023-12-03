import React, { useState } from "react";
import { askChatgpt } from "./api/adress.js";

const FloatingIcon = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sendingImage, setSendingImage] = useState(false);

  const toggleVisibility = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      setSendingImage(true);
      const formData = new FormData();
      formData.append("image", selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { type: "image", url: imageUrl },
      ]);

      try {
        const response = await askChatgpt(formData);
        const responseText = response;

        if (responseText.exist) {
          const message =
            "El auto de sus sueños " +
            responseText.auto +
            " esta disponible en nuestras oficina de : ";

          // Agregar mensaje de texto
          setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { type: "text", content: message },
          ]);

          // Agregar información del auto
          responseText.car_info.forEach((item) =>
            setChatHistory((prevChatHistory) => [
              ...prevChatHistory,
              { type: "text", content: item },
            ])
          );

          setSelectedFile(null);
          setSendingImage(false);

          return;
        }

        const message = "Continuaremos buscando el auto de sus sueños "+ responseText.auto+" , por el momento tenemos los siguientes modelos disponibles: ";
        setChatHistory((prevChatHistory) => [
          ...prevChatHistory,
          { type: "text", content: message },
        ]);
        
        // Agregar información de los autos
        responseText.car_info.forEach((item) => {
          const newItem = item[3] + " " + item[1] + " en la sede "+ item[0];
          setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            { type: "text", content: newItem },
          ]);
        });
        




        setSendingImage(false);
      } catch (error) {
        console.error("Error al enviar la imagen:", error);
        setSendingImage(false);
      }
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <>
      <button
        onClick={toggleVisibility}
        className="fixed bottom-16 right-14 z-50 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
      >
        <span role="img" aria-label="Chat Icon" className="text-3xl">
          💬
        </span>
      </button>
      {isChatOpen && (
        <div className="fixed bottom-28 right-16 z-50 p-2 bg-blue-500 rounded-lg shadow-lg w-72 ">
          <div className="overflow-y-auto over max-h-[40vh] p-2">
            <div className="over max-h-[40vh]">
              <h2 className="font-bold rounded-lg bg-white p-2 mb-1">
                Automanage encuentra sueños
              </h2>
              <h2 className="font-bold rounded-lg bg-white p-2 ">
                Envianos una foto del carro que deseas.{" "}
              </h2>
              <br></br>
              <h2></h2>
              {chatHistory.map((item, index) => (
                <div key={index} className="rounded-lg bg-white mb-3 p-3">
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt="Imagen enviada"
                      style={{ maxWidth: "210px", maxHeight: "210px" }}
                    />
                  ) : (
                    <p>{item.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={sendingImage || selectedFile === null}
            className="w-full mt-2 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 rounded mb-3"
          >
            {sendingImage ? "loading..." : "Enviar"}
          </button>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full text-sm mb-2"
          />
        </div>
      )}
    </>
  );
};

export default FloatingIcon;
