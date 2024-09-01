import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import authService from "../AuthService/auth";
import { logout } from "../store/AuthSlice";

function Navbar() {
  const { status, userName } = useSelector((store) => store.authStore);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    const response = await authService.logout();
    console.log(response);
    dispatch(logout());
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
              <b style={{ color: "black" }}> Post App.</b>
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
              Home
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
              Create Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-posts"
              className={({ isActive }) =>
                isActive
                  ? "link-offset-2 link-underline link-underline-opacity-100"
                  : "link-offset-2 link-underline link-underline-opacity-0"
              }
            >
              Your Posts
            </NavLink>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          {status ? (
            <>
              <div style={{ display: "flex", gap: "10px" }}>
                <p>
                  <b>Wealcome, {userName}</b>
                </p>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
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
