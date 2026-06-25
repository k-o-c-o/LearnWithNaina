import api from "./api";

export const getMaterials = async (lessonId) => {
  const res = await api.get(
    `/materials/lesson/${lessonId}`
  );

  return res.data;
};

export const getMaterial = async (materialId) => {
  const res = await api.get(
    `/materials/${materialId}`
  );

  return res.data;
};