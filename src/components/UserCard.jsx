import React from "react";
import styles from "../styles/UserCard.module.css";

const UserCard = ({ user }) => {
  return (
    <div className={styles.student_card}>
      <h3 className={styles.title}>Identificação do Aluno</h3>
      <div className={styles.photo_container}>
        <img
          src={user.photo}
          alt="Foto do Aluno"
          className={styles.student_photo}
        />
        <button className={styles.photo_button}>ALTERAR FOTO</button>
      </div>
      <p>
        <strong>RM:</strong> {user.rm}
      </p>
      <p>
        <strong>Nome:</strong> {user.name}
      </p>
      <p>
        <strong>RA SED:</strong> {user.raSed}
      </p>

      <label>
        <strong>Habilitação:</strong>
      </label>
      <select className={styles.select_box}>
        {user.habilitacoes.map((hab, index) => (
          <option key={index} value={hab}>
            {hab}
          </option>
        ))}
      </select>

      <p>
        <strong>Sit. Matrícula:</strong> {user.situacaoMatricula}
      </p>
      <p>
        <strong>Turma:</strong> {user.turma}
      </p>
      <p>
        <strong>Semestre OC:</strong> {user.semestreOC}
      </p>
      <p>
        <strong>Ano OC:</strong> {user.anoOC}
      </p>
      <p>
        <strong>Módulo/Série:</strong> {user.serie}
      </p>
      <p>
        <strong>Grupo da Divisão:</strong> {user.grupoDivisao}
      </p>
    </div>
  );
};

export default UserCard;
