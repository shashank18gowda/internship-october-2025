import { Router } from "express";
import studentModel from "../../models/studentModel.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
const router = Router();

export default router.post("/", async (req, res) => {
  try {
    let { name, rollno, email } = req.body || {};

    if (!name || name == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "name"));
    }

    if (!rollno || rollno == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "rollno"));
    }

    if (!email || email == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "email"));
    }

    let isEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (!isEmail) {
      return send(res, setErrMsg(RESPONSE.INVALID, "email"));
    }

    let studentRollno = await studentModel.findOne({ rollno: rollno });

    if (studentRollno) {
      return res.send({
        message: "rollno already exists",
      });
    }

    await studentModel.create({
      name,
      rollno,
      email,
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Err", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
