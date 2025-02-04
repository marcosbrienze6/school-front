import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../services/useFetch";
import { Link } from "react-router-dom";

const UserRolePage = () => {
  const { roleId } = useParams();
  const {
    data: users,
    loading,
    error,
  } = useFetch("http://localhost:8000/api/user");

  const roles = {
    1: "Administrador",
    2: "Professor",
    3: "Alunos",
    4: "Responsável",
    5: "Funcionário",
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredUsers = users.filter(
    (user) => user.user_role_id === Number(roleId)
  );
  console.log(filteredUsers);

  return (
    <div>
      <h1>Lista de {roles[roleId]}</h1>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>
              {user.name} - {user.email}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRolePage;
