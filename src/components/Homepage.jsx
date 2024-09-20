import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../AuthService/auth";
import { login } from "../store/AuthSlice";

function Homepage() {
  const dispatch = useDispatch();
  const { status } = useSelector((store) => store.authStore);

  useEffect(() => {
    if (!status) {
      (async () => {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(login({ userData: user.$id, userName: user.name }));
        }
      })();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Homepage;
