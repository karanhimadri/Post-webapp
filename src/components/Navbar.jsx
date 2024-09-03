import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import authService from "../AuthService/auth";
import { logout } from "../store/AuthSlice";
import { useState } from "react";
import { BsSignpost2Fill } from "react-icons/bs";

function Navbar() {
  const { status, userName } = useSelector((store) => store.authStore);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    setLoading(true);
    await authService.logout();
    dispatch(logout());
    setLoading(false);
    navigate("/");
  }
  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <a
            href="/"
            className="d-inline-flex NavLink-body-emphasis text-decoration-none"
          >
            <h1>
              <b style={{ color: "black" }}>
                <BsSignpost2Fill /> Postly.
              </b>
            </h1>
          </a>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 hk004-css">
          <li>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive
                  ? "link-offset-2 link-underline link-underline-opacity-100"
                  : "link-offset-2 link-underline link-underline-opacity-0"
              }
            >
              <b>Home</b>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/create-post"
              className={({ isActive }) =>
                isActive
                  ? "link-offset-2 link-underline link-underline-opacity-100"
                  : "link-offset-2 link-underline link-underline-opacity-0"
              }
            >
              <b>Create Post</b>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-posts"
              className={({ isActive }) =>
                isActive
                  ? "link-offset-2 link-underline link-underline-opacity-100"
                  : "link-offset-2 link-underline link-underline-opacity-0"
              }
            >
              <b>Manage Posts</b>
            </NavLink>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          {status ? (
            <>
              <div style={{ display: "flex", gap: "10px" }}>
                <p>
                  <b>Welcome, {userName}</b>
                </p>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Logout"}
                </button>
              </div>
            </>
          ) : (
            <div>
              <Link to="/login" className="btn btn-outline-primary me-2">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign-up
              </Link>{" "}
            </div>
          )}
        </div>
      </header>
      <div style={{ borderTop: "2px solid black" }}></div>
    </div>
  );
}

export default Navbar;
