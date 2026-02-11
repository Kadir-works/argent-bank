// Import de la fonction officielle Redux Toolkit
// Elle permet de créer un store Redux de manière simplifiée
import { configureStore } from "@reduxjs/toolkit";

// Import du reducer d'authentification
import authReducer from "./authSlice";

// Création du store global
const store = configureStore({
  reducer: {
    // On déclare ici les différents "slices" de l'application
    // auth sera accessible via state.auth
    auth: authReducer,
  },
});

// Export du store pour l'injecter dans <Provider>
export default store;
