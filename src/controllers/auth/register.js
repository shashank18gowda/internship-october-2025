import { Router } from "express";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import teacherModel from "../../models/teacherModel.js";
const router = Router();
import bcrypt from "bcrypt";

export default router.post("/", async (req, res) => {
  try {
    let { name, email, password } = req.body || {};

    if (!name || name == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "name"));
    }
    if (!email || email == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "email"));
    }
    if (!password || password == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "password"));
    }

    let isEmail = email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (!isEmail) {
      return send(res, setErrMsg(RESPONSE.INVALID, "email"));
    }

    let isPassword = password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    );

    if (!isPassword) {
      return send(res, setErrMsg(RESPONSE.INVALID, "password format"));
    }

    let isEmailAlreadyExists = await teacherModel.findOne({ email: email });

    if (isEmailAlreadyExists) {
      return send(res, setErrMsg(RESPONSE.ALREADY_EXIST, "email"));
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

    await teacherModel.create({
      ...req.body,
      password: encryptedPassword,
      role: 1,
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (error) {
    console.log("Register", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
