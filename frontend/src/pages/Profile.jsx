import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // ← AJOUTER useDispatch ici
import { getUserProfile, updateUserProfile } from "../services/userService";
import { setUserProfile } from "../store/authSlice"; // ← Utiliser setUserProfile
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch(); // ← Maintenant useDispatch est défini
  
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserProfile(token);
        setUser(data.body);
        setFirstName(data.body.firstName);
        setLastName(data.body.lastName);
        // Mettre à jour le store Redux
        dispatch(setUserProfile(data.body));
      } catch {
        setError("Unable to load profile");
      }
    }

    if (token) fetchProfile();
  }, [token, dispatch]);

  const handleSave = async () => {
    try {
      const data = await updateUserProfile(token, firstName, lastName);
      setUser(data.body);
      setEdit(false);
      // Mettre à jour le store Redux avec les nouvelles infos
      dispatch(setUserProfile(data.body));
    } catch {
      setError("Update failed");
    }
  };

  if (error) return <main className="main bg-dark"><p>{error}</p></main>;
  if (!user) return <main className="main bg-dark"><p>Loading...</p></main>;

  return (
    <main className="main bg-dark">
      <div className="header">
        {!edit ? (
          <>
            <h1>
              Welcome back
              <br />
              {user.firstName} {user.lastName}!
            </h1>
            <button className="edit-button" onClick={() => setEdit(true)}>
              Edit Name
            </button>
          </>
        ) : (
          <>
            <h1>Edit profile</h1>
            <div className="edit-form">
              <div className="input-wrapper" style={{ width: "200px", margin: "10px auto" }}>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="input-wrapper" style={{ width: "200px", margin: "10px auto" }}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
                <button 
                  className="edit-button" 
                  onClick={handleSave}
                  style={{ width: "100px" }}
                >
                  Save
                </button>
                <button 
                  className="edit-button" 
                  onClick={() => setEdit(false)}
                  style={{ 
                    width: "100px", 
                    backgroundColor: "transparent", 
                    color: "#00bc77",
                    border: "2px solid #00bc77"
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>
      
      {/* Account 1 - Checking */}
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button 
            className="transaction-button"
            onClick={() => navigate("/accounts/checking-x8349/transactions")}
          >
            View transactions
          </button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button 
            className="transaction-button"
            onClick={() => navigate("/accounts/savings-x6712/transactions")}
          >
            View transactions
          </button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button 
            className="transaction-button"
            onClick={() => navigate("/accounts/creditcard-x8349/transactions")}
          >
            View transactions
          </button>
        </div>
      </section>
    </main>
  );
}

export default Profile;