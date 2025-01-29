import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import UsersList from "../components/UsersList";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const roles = {
    1: "Administrador",
    2: "Professor",
    3: "Aluno",
    4: "Responsável",
    5: "Funcionário",
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <Navbar />
          <p>
            Olá, {user.name}! -{" "}
            {roles[user.user_role_id] || "Cargo não definido"}
          </p>
          <UsersList />
        </div>
      ) : (
        <div>
          <Navbar />
          <h1>tem nada p tu aqui nao, loga ai</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
