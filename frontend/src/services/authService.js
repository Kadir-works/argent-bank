// URL de base de l'API backend
const API_URL = "http://localhost:3001/api/v1/user";

// Fonction asynchrone pour se connecter
export async function login(email, password) {
  // Appel HTTP vers l'endpoint /login
  const response = await fetch(`${API_URL}/login`, {
    method: "POST", // Méthode POST car on envoie des données
    headers: {
      "Content-Type": "application/json", // On précise qu'on envoie du JSON
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  // Si la réponse HTTP n'est pas OK (ex: 400, 401...)
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  // On retourne les données JSON (contient le token)
  return await response.json();
}
