import login from "./src/controllers/auth/login.js";
import register from "./src/controllers/auth/register.js";
import createStudent from "./src/controllers/manageStudent/createStudent.js";
import deleteStudent from "./src/controllers/manageStudent/deleteStudent.js";
import listStudents from "./src/controllers/manageStudent/listStudents.js";
import updateStudents from "./src/controllers/manageStudent/updateStudent.js";

const router = (app) => {
  app.use("/api/student/create", createStudent);
  app.use("/api/student/list", listStudents);
  app.use("/api/student/delete", deleteStudent);
  app.use("/api/student/update", updateStudents);

  //auth
  app.use("/api/auth/register", register);
  app.use("/api/auth/login", login);

};

export default router;
