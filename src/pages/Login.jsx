import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../services/apiService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user_role_id", response.data.user.user_role_id);
      console.log("Login realizado com sucesso!");

      const userResponse = await api.get("/auth/my-profile");
      navigate(`/user/${userResponse.data.user.id}`);
    } catch (err) {
      setErrorMessage("Erro ao logar ou buscar os dados do usuário.");
    }
  };

  return (
    <div>
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
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={() => setPasswordVisible(!passwordVisible)}>
          Mostrar senha
        </button>
        <div>
          <Link to="/forgot-password">Esqueceu a senha?</Link>
        </div>
        <button type="submit">Entrar</button>
        <div>
          <p>
            Não tem uma conta? <Link to={"/register"}>Crie uma!</Link>
          </p>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
