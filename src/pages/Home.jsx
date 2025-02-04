import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardCards from "../components/DashboardCards";
import UserCard from "../components/UserCard";
import styles from "../styles/Home.module.css";

import MyResponsiveLine from "../components/BarChart";
import { fetchStudentData } from "../services/fetchStudentData";

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const [chartData, setChartData] = useState("grades");
  const [data, setData] = useState([]);
  const studentId = 1; // Trocar pelo ID real do aluno

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

  useEffect(() => {
    fetchStudentData(studentId, chartData).then((response) => {
      const formattedData = [
        {
          id: chartData === "grades" ? "Notas Médias" : "Presença (%)",
          data: response.map((item) => ({
            x: chartData === "grades" ? item.course.name : item.date,
            y: chartData === "grades" ? item.grade : item.present ? 100 : 0,
          })),
        },
      ];
      setData(formattedData);
    });
  }, [chartData]);

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
              <h2>Professores qualificados</h2>
              <h2>Metodologia moderna e eficaz</h2>
              <button
                onClick={() =>
                  setChartData(chartData === "grades" ? "attendance" : "grades")
                }
              >
                {chartData === "grades" ? "Ver presença" : "Ver média de notas"}
              </button>
              <MyResponsiveLine
                data={data}
                title={
                  chartData === "grades"
                    ? "Notas média das notas"
                    : "Presença (%)"
                }
              />
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
