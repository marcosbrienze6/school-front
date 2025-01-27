import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../hooks/apiService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("access_token", response.data.access_token);
      console.log("Login realizado com sucesso!");

      const userResponse = await api.get("/auth/my-profile");
      navigate(`/user/${userResponse.data.user.id}`);
    } catch (err) {
      setErrorMessage("Erro ao logar ou buscar os dados do usuário.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">E-mail:</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Entrar</button>
      <div>
        <Link to="/forgot-password">Esqueceu a senha?</Link>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

export default Login;
