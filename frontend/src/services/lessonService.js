import api from "./api";
export const createLesson = async (lesson) => {
  const res = await api.post(
    "/lessons",
    lesson
  );

  return res.data;
};

export const getLessons =async (courseId) => {
  const res = await api.get(
    `/lessons/${courseId}`
  );

  return res.data;
};

export const uploadLessonPDF = async (
    lessonId,
    pdf
) => {

    const res = await api.post(
        `/lessons/${lessonId}/upload`,
        pdf
    );

    return res.data;

};

export const getLesson = async (lessonId) => {
  const res = await api.get(
    `/lessons/lesson/${lessonId}`
  );

  return res.data;
};