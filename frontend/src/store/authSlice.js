import { createSlice } from "@reduxjs/toolkit";

// On récupère le token depuis le localStorage
// Cela permet de conserver la session après un refresh
const tokenFromStorage = localStorage.getItem("token");

// État initial du slice
const initialState = {
  // Si un token existe → utilisateur considéré comme connecté
  isAuthenticated: !!tokenFromStorage,

  // On stocke le token
  token: tokenFromStorage,

  // Les données utilisateur seront récupérées après login
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Action appelée après connexion réussie
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;

      // On sauvegarde le token dans le localStorage
      localStorage.setItem("token", action.payload.token);
    },

    // Permet de mettre à jour les données utilisateur
    setUserProfile: (state, action) => {
      state.user = action.payload;
    },

    // Action de déconnexion
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;

      // On supprime le token du localStorage
      localStorage.removeItem("token");
    },
  },
});

// Export des actions
export const { loginSuccess, setUserProfile, logout } = authSlice.actions;

// Export du reducer
export default authSlice.reducer;
