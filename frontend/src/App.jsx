// Import des outils de routing de React Router
import { Routes, Route } from "react-router-dom";

// Hook React pour exécuter du code au montage du composant
import { useEffect } from "react";

// Hook Redux pour envoyer des actions au store
import { useDispatch } from "react-redux";

// Action Redux pour stocker les infos de connexion
import { loginSuccess } from "./store/authSlice";

// Fonction qui appelle l'API pour récupérer le profil utilisateur
import { getUserProfile } from "./services/userService";

// Import des pages
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import TransactionsPage from "./pages/TransactionsPage";

// Composants globaux
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  // Permet d'envoyer des actions Redux
  const dispatch = useDispatch();

  /**
   * useEffect exécuté au montage du composant (équivalent componentDidMount)
   * Son rôle ici :
   * Vérifier si un token existe dans le localStorage
   * Si oui → récupérer le profil utilisateur automatiquement
   */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Appel API pour récupérer les infos utilisateur
      getUserProfile(token)
        .then(userData => {
          // Si succès → on met à jour Redux avec le token + user
          dispatch(
            loginSuccess({
              token: token,
              user: userData.body,
            })
          );
        })
        .catch(() => {
          // Si le token est invalide → on le supprime
          localStorage.removeItem("token");
        });
    }
  }, [dispatch]); // Se déclenche une seule fois

  return (
    <div className="app-layout">
      
      {/* Header visible sur toutes les pages */}
      <Header />

      {/* Définition des routes */}
      <Routes>

        {/* Route publique */}
        <Route path="/" element={<Home />} />

        {/* Route publique */}
        <Route path="/login" element={<SignIn />} />

        {/* Route protégée : accessible uniquement si connecté */}
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />

        {/* Route protégée avec paramètre dynamique */}
        <Route 
          path="/accounts/:accountId/transactions" 
          element={
            <PrivateRoute>
              <TransactionsPage />
            </PrivateRoute>
          } 
        />

      </Routes>

      {/* Footer visible sur toutes les pages */}
      <Footer />
    </div>
  );
}

export default App;
