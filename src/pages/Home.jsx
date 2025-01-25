import React from "react";
import UsersList from "../components/UsersList";
import styles from "./Home.module.css";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <h1 className={styles.h1}>Conteudo da home</h1>
      <UsersList />
    </div>
  );
};

export default Home;
