import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/apiService";

function UserPage() {
  const { user: loggedUser, logout } = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/my-profile");
        setProfileUser(response.data);
        setProfilePicture(response.data.profile_picture);
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          cpf: response.data.user.cpf,
        });
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleSave = async () => {
    try {
      await api.put("/auth/{id}", formData);
      setEditing(false);
      setProfileUser({
        ...profileUser,
        user: { ...profileUser.user, ...formData },
      });
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Erro ao salvar as alterações.");
    }
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

      <p>
        Name:
        {editing ? (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        ) : (
          profileUser.user.name
        )}
      </p>

      <p>
        Email:{" "}
        {editing ? (
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        ) : (
          profileUser.user.email
        )}
      </p>

      <p>
        Cargo: {roles[profileUser.user.user_role_id] || "Cargo não definido"}
      </p>

      <p>
        CPF:{" "}
        {editing ? (
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
          />
        ) : (
          profileUser.user.cpf
        )}
      </p>

      <p>
        Usuário criado em:{" "}
        {new Date(profileUser.user.created_at).toLocaleDateString()}
      </p>

      {loggedUser?.id === Number(userId) && (
        <div>
          <button onClick={editing ? handleSave : handleEditToggle}>
            {editing ? "Salvar" : "Editar"}
          </button>
          <button onClick={handleLogout}>Sair</button>
        </div>
      )}

      <Link to="/">Home</Link>
    </div>
  );
}

export default UserPage;
