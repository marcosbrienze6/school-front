import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import UsersList from "../components/UsersList";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <Navbar />
          <p>Olá, {user.name}!</p>
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
