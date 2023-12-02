import React, { useState } from "react";

const FloatingIcon = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userInput, setUserInput] = useState("");

  const toggleVisibility = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = () => {
    if (userInput === "") return;
    setChatHistory([...chatHistory, userInput]);
    setUserInput("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Aquí manejas la carga de la imagen
      console.log(file);
      // Agregar la imagen al chatHistory o manejarla de otra manera
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
        <div className="fixed bottom-28 right-16 z-60 p-4 bg-blue-500 rounded-lg shadow-lg w-72 ">
          <div className="overflow-y-auto max-h-[40vh]">
            <h2 className="font-bold rounded-lg bg-slate-400 p-2 mb-3">
              Hola, en que puedo ayudarte?
            </h2>
            {chatHistory.map((message, index) => (
              <div key={index} className="rounded-lg bg-white  w-2/3 mb-3">
                <p>{message}</p>
              </div>
            ))}
          </div>
          <textarea
            value={userInput}
            onChange={handleInputChange}
            className="w-full h-10"
          />
          <button
            onClick={handleSubmit}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
          >
            Enviar
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
