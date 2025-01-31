import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/DashboardCards.module.css"; // Importa o CSS

const cards = [
  { title: "Professores", link: "/role/2" },
  { title: "Alunos", link: "/role/3" },
  { title: "Responsáveis", link: "/role/4" },
  { title: "Funcionários", link: "/role/5" },
  { title: "Diário", link: "/turmas" }, // colocar hover pra quando passar escolher entre turmas e cursos
  { title: "Calendário", link: "/calendar" },
  { title: "Desempenho Geral", link: "/overall-performance" },
];

const DashboardCards = () => {
  return (
    <div className={styles.dashboard_container}>
      <div className={styles.card_grid}>
        {cards.map((card, index) => (
          <Link to={card.link} key={index} className={styles.card}>
            {card.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;
