import { Router } from "express";
import studentModel from "../../models/studentModel.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
const router = Router();

import upload from "../../middlewares/uploads.js";
import authenticate from "../../middlewares/authenticate.js";
const uploads = upload.single("image");
// const uploads = upload.array("image",2);
// const uploads = upload.fields([
//   { name: "avatar", maxCount: 1 },
//   { name: "gallery", maxCount: 8 },
// ]);

export default router.post("/", authenticate, async (req, res) => {
  try {
    if (req.token.role != 1) {
      return send(res, RESPONSE.ACCESS_DENIED);
    }

    uploads(req, res, async (err) => {
      if (err) {
        return send(res, setErrMsg(RESPONSE.MULTER_ERR, err));
      }

      if (!req.file || req.file == undefined) {
        return send(res, setErrMsg(RESPONSE.REQUIRED, "image"));
      }

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
        return send(res, setErrMsg(RESPONSE.ALREADY_EXIST, "rollno"));
      }

      await studentModel.create({
        name,
        rollno,
        email,
        // image: req.file.filename ? req.file.filename : null,//use when image is non mandatory field
        image: req.file.filename,
        teacher_id: req.token.id,
      });

      return send(res, RESPONSE.SUCCESS);
    });
  } catch (error) {
    console.log("Create Student:", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
