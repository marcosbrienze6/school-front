import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/apiService";
import styles from "../styles/UserPage.module.css";

function UserPage() {
  const { user: loggedUser, logout } = useAuth();
  const { userId } = useParams();
  const [showFileInput, setShowFileInput] = useState(false);
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    role: "",
    student_data: null,
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
          id: response.data.user.id,
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
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

  return (
    <div>
      <div className={styles.profile_header}>
        <div className={styles.profile_info}>
          <div
            className={styles.profile_picture}
            onClick={() => setShowFileInput(true)}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview da nova foto"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
            ) : profilePicture ? (
              <img
                src={profilePicture}
                alt="Foto de perfil"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
            ) : (
              <p>Sem foto de perfil</p>
            )}

            {showFileInput && (
              <form onSubmit={handleUpload}>
                <input
                  type="file"
                  name="profile_picture"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <button type="submit">Atualizar Foto</button>
              </form>
            )}
          </div>
          <div>
            <h2 className={styles.profile_name}>{formData.name}</h2>
            <button className={styles.edit_button}>Edit Profile</button>
            <button onClick={handleLogout}>Sair</button>
            <p className={styles.profile_xp}>CNA Expansion | 1.630xp</p>
            <p className={styles.profile_level}>CNA Expansion 1</p>
          </div>
        </div>
        <div className={styles.profile_actions}>
          <button className={styles.settings_button}>⚙️</button>
        </div>
      </div>
      {formData.role === "student" && formData.student_data ? (
        <div className={styles.info_card}>
          <p>
            <strong>Situação Matrícula:</strong> CURSANDO
          </p>
          <p>
            <strong>Módulo/Série:</strong> {formData.student_data.grade_module}
          </p>
          <p>
            <strong>CPF:</strong> {formData.cpf}
          </p>
          <p>
            <strong>Horário:</strong> 07:15 às 15:10
          </p>
          <p>
            <strong>Período:</strong> 2025 até 2027
          </p>
        </div>
      ) : (
        <p>Você é admin</p>
      )}
    </div>
  );
}

export default UserPage;

// {
//   profilePicture ? (
//     <img
//       src={profilePicture}
//       alt="Foto de perfil"
//       style={{ width: "150px", height: "150px", borderRadius: "50%" }}
//     />
//   ) : (
//     <p>Sem foto de perfil</p>
//   );
// }

// {
//   loggedUser?.id === Number(userId) && (
//     <form onSubmit={handleUpload}>
//       <input
//         type="file"
//         name="profile_picture"
//         accept="image/*"
//         onChange={handleImageChange}
//       />
//       {imagePreview && (
//         <img
//           src={imagePreview}
//           alt="Preview da nova foto"
//           style={{
//             width: "100px",
//             height: "100px",
//             borderRadius: "50%",
//             marginTop: "10px",
//           }}
//         />
//       )}
//       <button type="submit">Atualizar Foto</button>
//     </form>
//   );
// }
