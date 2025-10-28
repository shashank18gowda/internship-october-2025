import { Router } from "express";
import studentModel from "../../models/studentModel.js";
const router = Router();

export default router.post("/", async (req, res) => {
  try {
    let { name, rollno, email } = req.body || {};
    console.log({ ...req.body });

    await studentModel.create({
      //   ...req.body,
      name,
      rollno,
      email,
    });

    return res.send({
      message: "OK",
    });
  } catch (error) {
    console.log("Err", error);
  }
});
