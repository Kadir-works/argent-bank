// Import de React
import React from "react";

// Permet de créer le point d’entrée React dans le DOM
import ReactDOM from "react-dom/client";

// Permet la gestion des routes côté client
import { BrowserRouter } from "react-router-dom";

// Permet d'injecter le store Redux dans toute l'application
import { Provider } from "react-redux";

// Composant principal de l'application
import App from "./App";

// Import du store Redux
import store from "./store/store";

// Import des styles globaux
import "./styles/main.css";

// Création de la racine React et rendu de l'application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    {/* Rend Redux accessible à toute l’application */}
    <Provider store={store}>

      {/* Active le système de routing */}
      <BrowserRouter>

        {/* Composant principal */}
        <App />

      </BrowserRouter>

    </Provider>

  </React.StrictMode>
);
