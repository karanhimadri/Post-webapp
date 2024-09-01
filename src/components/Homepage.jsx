import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "../AuthService/auth";
import { login } from "../store/AuthSlice";

function Homepage() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authService.getCurrentUser();
      if (user) {
        dispatch(login({ userData: user.$id, userName: user.name }));
      }
    })();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <Outlet />
      <Footer></Footer>
    </div>
  );
}

export default Homepage;
