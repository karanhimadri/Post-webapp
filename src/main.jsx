import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Login from "./components/LogIn";
import ManagePost from "./components/ManagePost";
import SignUp from "./components/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/Homepage"
import appStore from "./store/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Homepage />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/manage-posts" element={<ManagePost />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
