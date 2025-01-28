import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../services/apiService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [user_role_id, setUserRole] = useState("");

  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/user/create", {
        name,
        cpf,
        address,
        user_role_id,
        email,
        password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      console.log("Conta criada com sucesso!");

      const userResponse = await api.get("/auth/my-profile");
      navigate(`/user/${userResponse.data.user.id}`);
    } catch (err) {
      setErrorMessage("Erro ao logar ou buscar os dados do usuário.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Crie sua conta</h1>
        <div>
          <label htmlFor="name">Nome completo:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Endereço:</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Digite seu endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="user_role_id">Cargo:</label>
          <input
            type="number"
            id="user_role_id"
            name="user_role_id"
            placeholder="Digite seu cargo"
            value={user_role_id}
            onChange={(e) => setUserRole(e.target.value)}
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
        <button type="submit">Registrar</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Register;
