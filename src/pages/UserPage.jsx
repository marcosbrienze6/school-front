import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../hooks/apiService";

function UserPage() {
  const { id } = useParams(); // ID do usuário da URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/auth/my-profile")
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        setError("Erro ao carregar dados do usuário.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1>Bem-vindo, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Usuário criado em: {new Date(user.created_at).toLocaleDateString()}</p>
    </div>
  );
}

export default UserPage;
