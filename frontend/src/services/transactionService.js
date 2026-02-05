// src/services/transactionService.js

// Fonction pour récupérer les transactions d'un compte
export async function getAccountTransactions(token, accountId, month, year) {
  // NOTE: L'API n'existe pas encore, donc nous simulons des données
  // En production, décommentez le code fetch

  /*
  const url = new URL(`http://localhost:3001/api/v1/accounts/${accountId}/transactions`);
  
  if (month) url.searchParams.append('month', month);
  if (year) url.searchParams.append('year', year);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  return response.json();
  */

  // SIMULATION: Données de test basées sur la maquette
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 0,
        message: "Transactions retrieved successfully",
        body: [
          {
            id: "1",
            accountId: accountId,
            type: "electronic",
            category: "Food",
            amount: -5.0,
            description: "Golden Sun Bakery",
            date: "2024-06-20T10:30:00Z",
            balance: 2082.79,
            notes: "Morning coffee",
            merchant: "Golden Sun Bakery",
          },
          {
            id: "2",
            accountId: accountId,
            type: "electronic",
            category: "Food",
            amount: -10.0,
            description: "Golden Sun Bakery",
            date: "2024-06-20T14:45:00Z",
            balance: 2072.79,
            notes: "Lunch",
            merchant: "Golden Sun Bakery",
          },
          {
            id: "3",
            accountId: accountId,
            type: "electronic",
            category: "Shopping",
            amount: -50.0,
            description: "Amazon Purchase",
            date: "2024-06-19T09:15:00Z",
            balance: 2122.79,
            notes: "Books",
            merchant: "Amazon",
          },
          {
            id: "4",
            accountId: accountId,
            type: "transfer",
            category: "Income",
            amount: 2000.0,
            description: "Salary Deposit",
            date: "2024-06-15T00:00:00Z",
            balance: 2172.79,
            notes: "Monthly salary",
            merchant: "Employer Corp",
          },
        ],
      });
    }, 500); // Simule un délai réseau
  });
}

// Fonction pour récupérer les détails d'une transaction
export async function getTransactionDetails(token, transactionId) {
  // SIMULATION
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 0,
        message: "Transaction details retrieved successfully",
        body: {
          id: transactionId,
          accountId: "checking-x8349",
          type: "electronic",
          category: "Food",
          amount: -5.0,
          description: "Golden Sun Bakery",
          date: "2024-06-20T10:30:00Z",
          balance: 2082.79,
          notes: "Morning coffee with colleagues",
          merchant: "Golden Sun Bakery",
          transactionType: "Electronic",
          location: "New York, NY",
        },
      });
    }, 300);
  });
}
