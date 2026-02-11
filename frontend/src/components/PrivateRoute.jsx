// Hook Redux pour lire une valeur dans le state global
import { useSelector } from "react-redux";

// Composant React Router permettant de rediriger
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {

  // On récupère le statut d'authentification depuis Redux
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  // Si l'utilisateur est authentifié → on affiche la page demandée
  // Sinon → redirection vers /login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
