import React from "react";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div className={styles.navbar}>
          <h1>SMP - Online</h1>

          <Link to={"/user/:id"}>Meu perfil</Link>
        </div>
      ) : (
        <div className={styles.navbar}>
          <h1>SMP - Online</h1>
          <Link to={"/login"}>Entrar</Link>
          <Link to={"/register"}>Criar conta</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
