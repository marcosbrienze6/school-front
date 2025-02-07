import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/apiService";
import styles from "../styles/Register.module.css";

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
    <div className={styles.register_container}>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <h2>Crie sua conta</h2>

        <label>Nome:</label>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Senha:</label>
        <div className={styles.input_container}>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <label>Tipo de usuário:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Aluno</option>
          <option value="teacher">Professor</option>
        </select>

        {role === "student" && (
          <>
            <label>Módulo:</label>
            <select
              value={gradeModule}
              onChange={(e) => setGradeModule(e.target.value)}
            >
              <option value="module_1">Módulo 1</option>
              <option value="module_2">Módulo 2</option>
              <option value="module_3">Módulo 3</option>
            </select>
          </>
        )}

        {role === "teacher" && (
          <>
            <label>Departamento:</label>
            <input
              type="text"
              placeholder="Digite seu departamento"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </>
        )}

        <button type="submit">Registrar</button>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Register;
