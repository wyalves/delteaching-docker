import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Opcional: para estilos globais
import App from "./App"; // Importa o componente principal

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // Renderiza no elemento com id 'root' no HTML
);
