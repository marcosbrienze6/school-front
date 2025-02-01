import React from "react";
import { useAuth } from "../context/AuthContext";
import DashboardCards from "../components/DashboardCards";
import UserCard from "../components/UserCard";
import styles from "../styles/Home.module.css";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const roles = {
    1: "Administrador",
    2: "Professor",
    3: "Aluno",
    4: "Responsável",
    5: "Funcionário",
  };

  const hasRole = (roleId) => user?.user_role_id === roleId;

  const adminCards = [
    { title: "Professores", link: "/role/2" },
    { title: "Alunos", link: "/role/3" },
    { title: "Responsáveis", link: "/role/4" },
    { title: "Funcionários", link: "/role/5" },
    { title: "Desempenho Geral", link: "/overall-performance" },
  ];

  const professorCards = [
    { title: "Diário", link: "/turmas" },
    { title: "Calendário", link: "/calendar" },
  ];

  const alunoCards = [
    { title: "Diário", link: "/turmas" },
    { title: "Calendário", link: "/calendar" },
  ];

  const responsavelCards = [{ title: "Calendário", link: "/calendar" }];

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>
            Olá, {hasRole(1) ? "Mestre" : ""} {user.name}! -{" "}
            {roles[user.user_role_id] || "Cargo não definido"}
          </p>
          <div className={styles.home_container}>
            <UserCard />
            {hasRole(1) && <DashboardCards cards={adminCards} />}
            {hasRole(2) && <DashboardCards cards={professorCards} />}
            {hasRole(3) && <DashboardCards cards={alunoCards} />}
            {hasRole(4) && <DashboardCards cards={responsavelCards} />}
          </div>
        </div>
      ) : (
        <div>
          <h1>Tem nada pra tu aqui não, loga aí</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
