import createStudent from "./src/controllers/manageStudent/createStudent.js";
const router = (app) => {
  app.use("/api/student", createStudent);
};

export default router;
