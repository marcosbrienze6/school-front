import React from "react";
import useFetch from "../services/useFetch";
import styles from "../styles/UserList.module.css";
const UsersList = () => {
  const {
    data: users,
    loading,
    error,
  } = useFetch("http://localhost:8000/api/user");
  console.log(users);

  const roles = {
    1: "Administrador",
    2: "Professor",
    3: "Aluno",
    4: "Responsável",
    5: "Funcionário",
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li className={styles.lines} key={user.id}>
            {user.name} - {user.email} - CPF:{user.cpf} - Rua: {user.address} -{" "}
            {roles[user.user_role_id] || "Cargo não definido"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
