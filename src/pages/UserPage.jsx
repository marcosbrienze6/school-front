import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/apiService";

function UserPage() {
  const { user: loggedUser, logout } = useAuth();
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/my-profile");
        setProfileUser(response.data);
        setProfilePicture(response.data.profile_picture);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, [loggedUser, userId]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!loggedUser || loggedUser.id !== Number(userId)) {
      alert("Você só pode alterar sua própria foto!");
      return;
    }

    const fileInput = e.target.elements.profile_picture.files[0];
    if (!fileInput) return;

    const formData = new FormData();
    formData.append("profile_picture", fileInput);

    try {
      const response = await api.post("/auth/my-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfilePicture(response.data.profile_picture);
    } catch (error) {
      console.error("Erro ao atualizar a foto de perfil:", error);
      alert("Erro ao atualizar a foto de perfil.");
    }
  };

  if (!profileUser) return <p>Carregando...</p>;

  const roles = {
    1: "Administrador",
    2: "Professor",
    3: "Aluno",
    4: "Responsável",
    5: "Funcionário",
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1>Perfil de {profileUser.user.name}</h1>
      <p>Email: {profileUser.user.email}</p>
      <p>
        Cargo: {roles[profileUser.user.user_role_id] || "Cargo não definido"}
      </p>
      <p>CPF: {profileUser.user.cpf}</p>
      <p>
        Usuário criado em:{" "}
        {new Date(profileUser.user.created_at).toLocaleDateString()}
      </p>

      {profilePicture ? (
        <img
          src={profilePicture}
          alt="Foto de perfil"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      ) : (
        <p>Sem foto de perfil</p>
      )}

      {loggedUser?.id === Number(userId) && (
        <form onSubmit={handleUpload}>
          <input
            type="file"
            name="profile_picture"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview da nova foto"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginTop: "10px",
              }}
            />
          )}
          <button type="submit">Atualizar Foto</button>
        </form>
      )}

      <Link to={"/"}>Home</Link>
      {loggedUser?.id === Number(userId) && (
        <button onClick={handleLogout}>Sair</button>
      )}
    </div>
  );
}

export default UserPage;
