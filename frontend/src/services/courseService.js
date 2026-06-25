import api from "./api";

export const createCourse = async (
  courseData
) => {
  const res = await api.post(
    "/courses",
    courseData
  );

  return res.data;
};

export const getCourses = async () => {
  const res = await api.get("/courses");

  return res.data;
};

export const getCourse = async (courseId) => {
  const res = await api.get(
    `/courses/${courseId}`
  );

  return res.data;
};