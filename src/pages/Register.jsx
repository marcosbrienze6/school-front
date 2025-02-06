import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/apiService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("student"); // 'student' ou 'teacher'
  const [gradeModule, setGradeModule] = useState("module_1"); // Apenas para estudantes
  const [department, setDepartment] = useState(""); // Apenas para professores

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpa mensagens de erro anteriores
    setSuccessMessage("");

    try {
      const response = await api.post("/user/create", {
        name,
        cpf,
        address,
        email,
        password,
        role,
        ...(role === "student" ||
          (role === "teacher" && { grade_module: gradeModule })),
        ...(role === "teacher" && { department }),
      });
      localStorage.setItem("access_token", response.data.access_token);
      setSuccessMessage("Conta criada com sucesso!");

      // Obtém o perfil do usuário criado
      const userResponse = await api.get("/auth/my-profile", {
        headers: { Authorization: `Bearer ${response.data.access_token}` },
      });

      // Redireciona para o perfil do usuário
      navigate(`/user/${userResponse.data.user.id}`);
    } catch (err) {
      const message =
        err.response?.data?.message || "Erro ao registrar o usuário.";
      setErrorMessage(message);
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
            type="email"
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
          <select
            id="user_role_id"
            value={user_role_id}
            onChange={(e) => setUserRole(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecione o Cargo
            </option>
            <option value="1">Administrador</option>
            <option value="2">Professor</option>
            <option value="3">Aluno</option>
            <option value="4">Responsável</option>
            <option value="5">Funcionário</option>
          </select>
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
        <button
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          {passwordVisible ? "Ocultar senha" : "Mostrar senha"}
        </button>
        <button type="submit">Registrar</button>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Register;
