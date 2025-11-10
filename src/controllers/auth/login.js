import { Router } from "express";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import teacherModel from "../../models/teacherModel.js";
import { ROLE, STATE } from "../../config/constant.js";
const router = Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default router.post("/", async (req, res) => {
  try {
    let { email, password } = req.body || {};

    if (!email || email == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "email"));
    }
    if (!password || password == undefined) {
      return send(res, setErrMsg(RESPONSE.REQUIRED, "password"));
    }

    let userData = await teacherModel.findOne({
      email: email,
      //   password: password, //for normal string comparison
      isactive: STATE.ACTIVE,
    });

    if (userData && (await bcrypt.compare(password, userData.password))) {
      let token = await jwt.sign(
        {
          id: userData._id,
          email: userData.email,
          //    role:userData.role
          role: ROLE.HM,
        },
        process.env.JWT_SECRET
        // { expiresIn: 20 } //in seconds
      );

      return send(res, RESPONSE.SUCCESS, token);
    } else {
      return send(res, setErrMsg(RESPONSE.INVALID, "Login credential"));
    }
  } catch (error) {
    console.log("Login", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
