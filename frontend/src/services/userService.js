// URL de base de l'API backend
const API_URL = "http://localhost:3001/api/v1/user";

/**
 * Récupère le profil utilisateur
 */
export async function getUserProfile(token) {
  const response = await fetch(`${API_URL}/profile`, {
    method: "POST", // Spécificité du backend OC
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Envoi du token JWT
    },
  });

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response.json();
}

/**
 * Met à jour le profil utilisateur
 */
export async function updateUserProfile(token, firstName, lastName) {
  const response = await fetch(`${API_URL}/profile`, {
    method: "PUT", // Mise à jour
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      firstName,
      lastName,
    }),
  });

  if (!response.ok) {
    throw new Error("Update failed");
  }

  return response.json();
}
