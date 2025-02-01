import React from "react";
import { useAuth } from "../context/AuthContext";
import DashboardCards from "../components/DashboardCards";
import UserCard from "../components/UserCard";
import styles from "../styles/Home.module.css";
import {
  FaUser,
  FaCalendarAlt,
  FaFileInvoice,
  FaHome,
  FaQuestionCircle,
} from "react-icons/fa";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const hasRole = (roleId) => user?.user_role_id === roleId;

  const adminCards = [
    { title: "Professores", link: "/role/2" },
    { title: "Alunos", link: "/role/3" },
    { title: "Responsáveis", link: "/role/4" },
    { title: "Funcionários", link: "/role/5" },
    { title: "Desempenho Geral", link: "/overall-performance" },
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
    <div>
      {isAuthenticated ? (
        <div>
          <div className={styles.home_container}>
            <UserCard />
            {hasRole(1) && <DashboardCards cards={adminCards} />}
            {hasRole(2) && <DashboardCards cards={teacherCards} />}
            {hasRole(3) && <DashboardCards cards={studentCards} />}
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
