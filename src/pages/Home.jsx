import React from "react";
import { useAuth } from "../context/AuthContext";
import DashboardCards from "../components/DashboardCards";
import UserCard from "../components/UserCard";
import styles from "../styles/Home.module.css";

import MyResponsiveLine from "../components/BarChart";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const hasRole = (roleId) => user?.user_role_id === roleId;

  const adminCards = [
    { title: "Desempenho Geral", link: "/overall-performance" },
    { title: "Professores", link: "/role/2" },
    { title: "Alunos", link: "/role/3" },
    { title: "Responsáveis", link: "/role/4" },
    { title: "Funcionários", link: "/role/5" },
  ];

  const teacherCards = [
    { title: "Diário", link: "/class" },
    { title: "Calendário", link: "/calendar" },
  ];

  const studentCards = [
    { title: "Diário", link: "/class" },
    { title: "Calendário", link: "/calendar" },
  ];

  const responsavelCards = [{ title: "Calendário", link: "/calendar" }];

  return (
    <div className={styles.home_wrapper}>
      {isAuthenticated ? (
        <>
          <div className={styles.home_container}>
            <UserCard />
            {hasRole(1) && <DashboardCards cards={adminCards} />}
            {hasRole(2) && <DashboardCards cards={teacherCards} />}
            {hasRole(3) && <DashboardCards cards={studentCards} />}
            {hasRole(4) && <DashboardCards cards={responsavelCards} />}
          </div>
          <div className={styles.search_container}>
            <input placeholder="Busque por algo" type="search" />
            <div className={styles.extra_content}>
              <div>
                <h2>Mais de 7000 alunos!</h2>
              </div>
              <div>
                <h2>Professores qualificados</h2>
              </div>
              <div>
                <h2>Metodologia moderna e eficaz</h2>
              </div>
              <MyResponsiveLine />
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1>Tem nada pra tu aqui não, loga aí</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
