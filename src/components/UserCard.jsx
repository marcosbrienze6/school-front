import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/apiService";
import styles from "../styles/UserCard.module.css";

function UserCard() {
  const { user: loggedUser } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/my-profile");
        setProfileUser(response.data);
        setProfilePicture(
          response.data.profile_picture || "/default-profile.png"
        );
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, [loggedUser]);

  if (!profileUser) return <p>Carregando...</p>;

  const roles = {
    1: "Administrador",
    2: "Professor",
    3: "Aluno",
    4: "Responsável",
    5: "Funcionário",
  };

  return (
    <div className={styles.user_card_container}>
      <img
        src={profilePicture}
        alt="Foto de perfil"
        style={{ width: "200px", height: "200px", borderRadius: "50%" }}
      />
      <h2>{profileUser.user.name}</h2>
      <p>{roles[profileUser.user.user_role_id] || "Cargo não definido"}</p>
    </div>
  );
}

export default UserCard;
