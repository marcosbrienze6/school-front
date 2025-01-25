import React from "react";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container">
      <div className={styles.navbar}>
        <h2>SMP - Online</h2>
        <Link to={"/login"}>Entrar</Link>
        <Link>Criar conta</Link>
      </div>
    </div>
  );
};

export default Navbar;
