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

export const getStudentEnrollments = async (
  studentId
) => {
  const res = await api.get(
    `/enrollments/${studentId}`
  );

  return res.data;
};

