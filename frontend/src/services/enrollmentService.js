import api from "./api";

export const enrollStudent = async (
  studentId,
  courseId
) => {
  const res = await api.post(
    "/enrollments",
    {
      studentId,
      courseId
    }
  );

  return res.data;
};

export const getEnrollments = async (
  studentId
) => {
  const res = await api.get(
    `/enrollments/${studentId}`
  );

  return res.data;
};

export const getStudentsByCourse = async (courseId) => {
  const res = await api.get(
    `/enrollments/course/${courseId}`
  );

  return res.data;
};

export const addGrade = async (
  enrollmentId,
  grade
) => {
  const res = await api.post(
    `/enrollments/grade/${enrollmentId}`,
    grade
  );

  return res.data;
};