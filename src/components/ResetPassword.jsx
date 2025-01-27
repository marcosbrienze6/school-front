import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState(searchParams.get("token") || "");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/password/reset",
        {
          token,
          password,
        }
      );
      console.log(response);
      setSuccess("Senha redefinida com sucesso! Redirecionando...");
      setTimeout(() => {
        navigate("/login"); // Redireciona para a página de login
      }, 3000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Erro ao redefinir a senha.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h1>Redefinir Senha</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="token">Token de Redefinição:</label>
          <input
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
          />
        </div>
        <div>
          <label htmlFor="password">Nova Senha:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0056b3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {loading ? "Processando..." : "Redefinir Senha"}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
