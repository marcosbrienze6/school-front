export const fetchStudentData = async (studentId, type) => {
  const url = `http://127.0.0.1:8000/api/auth/students/${studentId}/${type}`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return [];
  }
};
