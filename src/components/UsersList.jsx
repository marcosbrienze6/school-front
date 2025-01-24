import React from "react";
import useFetch from "../hooks/useFetch";

const UsersList = () => {
  const {
    data: users,
    loading,
    error,
  } = useFetch("http://localhost:8000/api/user");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
