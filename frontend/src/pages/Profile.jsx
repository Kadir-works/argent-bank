import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../services/userService";

function Profile() {
  const token = useSelector((state) => state.auth.token);

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
      } catch {
        setError("Unable to load profile");
      }
    }

    if (token) fetchProfile();
  }, [token]);

  const handleSave = async () => {
    try {
      const data = await updateUserProfile(token, firstName, lastName);
      setUser(data.body);
      setEdit(false);
    } catch {
      setError("Update failed");
    }
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>

      {!edit ? (
        <>
          <p>First name: {user.firstName}</p>
          <p>Last name: {user.lastName}</p>
          <button onClick={() => setEdit(true)}>Edit Name</button>
        </>
      ) : (
        <>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEdit(false)}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default Profile;
