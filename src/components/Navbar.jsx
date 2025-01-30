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
          <Link to={"/user/:id"}>Meu perfil</Link>
          <ul className={styles.menu}>
            <li>
              <a href="#">Gestão de Usuários</a>
              <ul className={styles.submenu}>
                <li>
                  <Link to="/role/3">Alunos</Link>
                </li>
                <li>
                  <Link to="/role/2">Professores</Link>
                </li>
                <li>
                  <Link to="/role/4">Responsáveis</Link>
                </li>
                <li>
                  <Link to="/role/5">Funcionários</Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul className={styles.menu}>
            <li>
              <a href="#">Diário</a>
              <ul className={styles.submenu}>
                <li>
                  <a href="#">Disciplinas</a>
                </li>
                <li>
                  <a href="#">Turmas</a>
                </li>
              </ul>
            </li>
          </ul>
          <Link to={"/dashboard"}>Desempenho Geral</Link>
          <Link to={"/calendar"}>Calendário</Link>
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
