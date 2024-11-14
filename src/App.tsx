import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login.page";
import { useAuth } from "./hooks/useAuth";
import style from "./App.module.css";
import Home from "./pages/Home/Home.page";

export const App = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <div className={style.mainContainer}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
};
