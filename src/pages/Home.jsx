import React from "react";
import { useAuth } from "../context/AuthContext";
import DashboardCards from "../components/DashboardCards";
import UserCard from "../components/UserCard";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const roles = {
    1: "Administrador",
    2: "Professor",
    3: "Aluno",
    4: "Responsável",
    5: "Funcionário",
  };

  const studentData = {
    photo: "https://via.placeholder.com/120x150", // Substitua pela URL da foto do aluno
    rm: "220377",
    name: "MARCOS MIGUEL BRIENZE",
    raSed: "107868964-7/SP",
    habilitacoes: ["EDIFICAÇÕES MTEC PI", "OUTRA OPÇÃO"],
    situacaoMatricula: "CONCLUÍDO",
    turma: "TURMA A",
    semestreOC: "2022",
    anoOC: "2022",
    serie: "3ª SÉRIE",
    grupoDivisao: "GRUPO B",
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>
            Olá, {user.name}! -{" "}
            {roles[user.user_role_id] || "Cargo não definido"}
          </p>
          <div className="home-container">
            <UserCard user={studentData} />
            <DashboardCards />
          </div>
        </div>
      ) : (
        <div>
          <h1>tem nada p tu aqui nao, loga ai</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
