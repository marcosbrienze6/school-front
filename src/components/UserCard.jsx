import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/apiService";

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

  return (
    <div style={{ maxWidth: "300px", margin: "auto", textAlign: "center" }}>
      <img
        src={profilePicture}
        alt="Foto de perfil"
        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
      />
      <p>
        <strong>Nome:</strong> {profileUser.user.name}
      </p>
      <p>
        <strong>Email:</strong> {profileUser.user.email}
      </p>
      <p>
        <strong>CPF:</strong> {profileUser.user.cpf}
      </p>
    </div>
  );
}

export default UserCard;
