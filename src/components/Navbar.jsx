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
          <ul className={styles.menu}>
            <li>
              <a href="#">Gestão de Usuários</a>
              <ul className={styles.submenu}>
                <li>
                  <Link to={"/student"}>Alunos</Link>
                </li>
                <li>
                  <a href="#">Professores</a>
                </li>
                <li>
                  <a href="#">Responsáveis</a>
                </li>
                <li>
                  <a href="#">Funcionários</a>
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
