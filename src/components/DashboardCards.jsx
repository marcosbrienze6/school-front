import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/DashboardCards.module.css"; // Importa o CSS

const DashboardCards = ({ cards }) => {
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
