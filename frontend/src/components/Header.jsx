import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import logo from "../assets/argentBankLogo.png";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {!isAuthenticated ? (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        ) : (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {user?.firstName}
            </Link>

            <button
              className="main-nav-item"
              onClick={handleLogout}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
