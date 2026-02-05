// src/pages/TransactionsPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function TransactionsPage() {
  const { accountId } = useParams();
  
  // Données simulées exactement comme la maquette
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: -5.00,
      balance: 2082.79,
      type: "Electronic",
      category: "Food",
      notes: "",
      isEditing: false
    },
    {
      id: 2,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: -10.00,
      balance: 2087.79,
      type: "Electronic",
      category: "Food",
      notes: "",
      isEditing: false
    },
    {
      id: 3,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: -20.00,
      balance: 2097.79,
      type: "Electronic",
      category: "Food",
      notes: "",
      isEditing: false
    },
    {
      id: 4,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: -30.00,
      balance: 2117.79,
      type: "Electronic",
      category: "Food",
      notes: "",
      isEditing: false
    },
    {
      id: 5,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: -40.00,
      balance: 2147.79,
      type: "Electronic",
      category: "Food",
      notes: "",
      isEditing: false
    },
    {
      id: 6,
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: -50.00,
      balance: 2187.79,
      type: "Electronic",
      category: "Food",
      notes: "",
      isEditing: false
    }
  ]);

  const [expandedRow, setExpandedRow] = useState(null);
  const [editingCategory, setEditingCategory] = useState("");
  const [editingNotes, setEditingNotes] = useState("");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(Math.abs(amount));
  };

  const toggleRowExpansion = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
      const transaction = transactions.find(t => t.id === id);
      setEditingCategory(transaction.category);
      setEditingNotes(transaction.notes);
    }
  };

  const handleSave = (id) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === id 
        ? { ...transaction, category: editingCategory, notes: editingNotes, isEditing: false }
        : transaction
    ));
    setExpandedRow(null);
  };

  const handleCancel = () => {
    setExpandedRow(null);
  };

  const handleCategoryChange = (e) => {
    setEditingCategory(e.target.value);
  };

  const handleNotesChange = (e) => {
    setEditingNotes(e.target.value);
  };

  // Déterminer le nom du compte
  const getAccountName = () => {
    const accountMap = {
      'checking-x8349': 'Argent Bank Checking (x8349)',
      'savings-x6712': 'Argent Bank Savings (x6712)',
      'creditcard-x8349': 'Argent Bank Credit Card (x8349)'
    };
    return accountMap[accountId] || `Account ${accountId}`;
  };

  // Déterminer le type de balance
  const getBalanceType = () => {
    return accountId === 'creditcard-x8349' ? 'Current Balance' : 'Available Balance';
  };

  return (
    <main className="main bg-dark">
      {/* Header avec infos du compte */}
      <div className="transactions-header" style={{ 
        color: 'white', 
        textAlign: 'center', 
        marginBottom: '2rem',
        paddingTop: '1rem'
      }}>
        <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>
          {getAccountName()}
        </h1>
        
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ 
            fontSize: '3rem', 
            margin: '0', 
            fontWeight: 'bold',
            color: '#00bc77'
          }}>
            {formatCurrency(transactions[0]?.balance || 0)}
          </p>
          <p style={{ 
            fontSize: '1.2rem', 
            margin: '0',
            opacity: 0.8
          }}>
            {getBalanceType()}
          </p>
        </div>
      </div>

      {/* Tableau des transactions - SIMPLE comme la maquette */}
      <div className="transactions-table-container" style={{
        width: '90%',
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '0',
        overflow: 'hidden'
      }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{ 
              backgroundColor: '#12002b', 
              color: 'white',
              height: '60px'
            }}>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                fontWeight: 'normal',
                width: '25%'
              }}>DATE</th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                fontWeight: 'normal',
                width: '35%'
              }}>DESCRIPTION</th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                fontWeight: 'normal',
                width: '20%'
              }}>AMOUNT</th>
              <th style={{ 
                padding: '1rem', 
                textAlign: 'left',
                fontWeight: 'normal',
                width: '20%'
              }}>BALANCE</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <React.Fragment key={transaction.id}>
                {/* Ligne principale */}
                <tr 
                  
                  style={{ 
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer',
                    height: '60px'
                  }}
                  onClick={() => toggleRowExpansion(transaction.id)}
                >
                  <td style={{ padding: '1rem' }}>{transaction.date}</td>
                  <td style={{ padding: '1rem' }}>{transaction.description}</td>
                  <td style={{ 
                    padding: '1rem',
                    color: transaction.amount < 0 ? '#d32f2f' : '#2e7d32',
                    fontWeight: 'bold'
                  }}>
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td style={{ 
                    padding: '1rem',
                    fontWeight: 'bold'
                  }}>
                    {formatCurrency(transaction.balance)}
                  </td>
                </tr>

                {/* Ligne dépliée pour les détails */}
                {expandedRow === transaction.id && (
                  <tr style={{ backgroundColor: '#f9f9f9' }}>
                    <td colSpan="4" style={{ padding: '1.5rem' }}>
                      <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: '1.5rem'
                      }}>
                        {/* Section Transaction Type */}
                        <div>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            marginBottom: '0.5rem'
                          }}>
                            <strong style={{ marginRight: '0.5rem' }}>Transaction Type:</strong>
                            <span>{transaction.type}</span>
                          </div>
                        </div>

                        {/* Section Category avec crayon d'édition */}
                        <div>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            marginBottom: '0.5rem'
                          }}>
                            <strong style={{ marginRight: '0.5rem' }}>Category:</strong>
                            {transaction.isEditing ? (
                              <select 
                                value={editingCategory}
                                onChange={handleCategoryChange}
                                style={{ 
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '4px',
                                  border: '1px solid #ccc'
                                }}
                              >
                                <option value="Food">Food</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Transport">Transport</option>
                                <option value="Utilities">Utilities</option>
                                <option value="Income">Income</option>
                              </select>
                            ) : (
                              <>
                                <span style={{ marginRight: '0.5rem' }}>{transaction.category}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setTransactions(transactions.map(t => 
                                      t.id === transaction.id 
                                        ? { ...t, isEditing: true }
                                        : t
                                    ));
                                  }}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0',
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                >
                                  <span style={{ 
                                    fontSize: '1.2rem',
                                    color: '#666'
                                  }}>✏️</span>
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Section Notes avec crayon d'édition */}
                        <div>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'flex-start',
                            marginBottom: '0.5rem'
                          }}>
                            <strong style={{ 
                              marginRight: '0.5rem',
                              minWidth: '60px'
                            }}>Notes:</strong>
                            {transaction.isEditing ? (
                              <textarea
                                value={editingNotes}
                                onChange={handleNotesChange}
                                style={{ 
                                  flex: 1,
                                  padding: '0.5rem',
                                  borderRadius: '4px',
                                  border: '1px solid #ccc',
                                  minHeight: '60px',
                                  fontFamily: 'inherit',
                                  fontSize: 'inherit'
                                }}
                                placeholder="Add notes about this transaction..."
                              />
                            ) : (
                              <>
                                <div style={{ 
                                  flex: 1,
                                  minHeight: '24px',
                                  color: transaction.notes ? 'inherit' : '#999'
                                }}>
                                  {transaction.notes || "No notes added"}
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setTransactions(transactions.map(t => 
                                      t.id === transaction.id 
                                        ? { ...t, isEditing: true }
                                        : t
                                    ));
                                  }}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0',
                                    marginLeft: '0.5rem',
                                    display: 'flex',
                                    alignItems: 'flex-start'
                                  }}
                                >
                                  <span style={{ 
                                    fontSize: '1.2rem',
                                    color: '#666'
                                  }}>✏️</span>
                                </button>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Boutons Save/Cancel */}
                        {transaction.isEditing && (
                          <div style={{ 
                            display: 'flex',
                            gap: '1rem',
                            marginTop: '1rem'
                          }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSave(transaction.id);
                              }}
                              style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#00bc77',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                              }}
                            >
                              Save
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCancel();
                              }}
                              style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#f5f5f5',
                                color: '#333',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer avec copyright */}
      <div style={{ 
        marginTop: '3rem',
        padding: '2rem',
        textAlign: 'center',
        color: 'white',
        opacity: 0.7
      }}>
        <p>Copyright 2020 Argent Bank</p>
      </div>
    </main>
  );
}

export default TransactionsPage;