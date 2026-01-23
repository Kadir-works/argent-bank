import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <Link to="/">Argent Bank</Link>

      {isAuthenticated ? (
        <div>
          <span>
            Welcome {user?.firstName}
          </span>
          <button onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      ) : (
        <Link to="/login">Sign In</Link>
      )}
    </nav>
  );
}

export default Header;
