import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/apiService";

function UserPage() {
  const { user, logout } = useAuth();
  const [profilePicture, setProfilePicture] = useState(
    user?.profile_picture || null
  );
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleImageChange = (e) => {
    const file = e.target.value[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
    {
      console.error("nenhum arquivo pai");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = e.target.elements.profile_picture.files[0];

    if (fileInput) {
      formData.append("profile_picture", fileInput);

      try {
        const response = await api.post(
          "/auth/update-profile-picture",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setProfilePicture(response.data.profile_picture);
        alert("Foto de perfil atualizada com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar a foto de perfil:", error);
        alert("Erro ao atualizar a foto de perfil.");
      }
    }
  };

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1>Bem-vindo, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Usuário criado em: {new Date(user.created_at).toLocaleDateString()}</p>
      {profilePicture ? (
        <img
          src={`http://127.0.0.1:8000/storage/${profilePicture}`}
          alt="Foto de perfil"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      ) : (
        <p>Sem foto de perfil</p>
      )}

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
      <Link to={"/"}>Home</Link>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default UserPage;
