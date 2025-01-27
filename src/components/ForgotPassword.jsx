import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/password/reset-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || "E-mail de recuperação enviado!");
        setErrorMessage("");
      } else {
        const error = await response.json();
        setErrorMessage(error.error || "Erro ao solicitar recuperação.");
        setMessage("");
      }
    } catch (err) {
      setErrorMessage("Erro ao conectar com o servidor.");
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <h2>Esqueceu a senha?</h2>
      <p>Digite seu e-mail ou CPF para receber o link de recuperação.</p>
      <div>
        <label htmlFor="email">E-mail ou CPF:</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Digite seu e-mail ou CPF"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Enviar</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

export default ForgotPassword;
