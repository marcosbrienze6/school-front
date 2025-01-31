import React from "react";
import styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();

  const roles = {
    1: "Administrador",
    2: "Professores",
    3: "Alunos",
    4: "Responsáveis",
    5: "Funcionários",
  };

  return (
    <div>
      {isAuthenticated ? (
        <div className={styles.navbar}>
          <Link to={"/"}>
            <h1>SMP - Online - {roles[user.user_role_id]}</h1>
          </Link>
          <Link to={`/user/${user.id}`}>Meu perfil</Link>
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
