import { Router } from "express";
import studentModel from "../../models/studentModel.js";
const router = Router();
import { STATE } from "../../config/constant.js";
import { RESPONSE } from "../../config/global.js";
import { send, setErrMsg } from "../../helper/responseHelper.js";
import authenticate from "../../middlewares/authenticate.js";

export default router.get("/", authenticate, async (req, res) => {
  try {
    let student_id = req.query.student_id;

    let page = req.query.page ? Number(req.query.page) : 1;
    let limit = req.query.limit ? Number(req.query.limit) : 10;

    let query = {
      isactive: STATE.ACTIVE,
      name: {
        $regex: req.query.searchKey ?? "",
        $options: "i",
      },
      // name: req.query.searchKey,
      teacher_id: req.token.id,
    };

    student_id != undefined ? (query._id = student_id) : "";
    //page = 1 , limit=10

    let studentData = await studentModel
      .find(query, {
        isactive: 0,
        __v: 0,
      })
      // 2-1 * 10 = 0
      .skip((page - 1) * limit)
      .limit(limit);

    // let studentData = await studentModel.aggregate([
    //   {
    //     $match: {
    //       isactive: STATE.ACTIVE,
    //     },
    //   },
    //   {
    //     $project: {
    //       isactive: 0,
    //       __v: 0,
    //     },
    //   },
    // ]);

    if (studentData.length == 0) {
      return send(res, setErrMsg(RESPONSE.NOT_FOUND, "students"));
    }

    studentData = studentData.map((itm) => {
      return {
        ...itm.toJSON(),
        image: itm.image ? "/uploads/" + itm.image : null,
        // image: itm.image ? "/profile/" + itm.image : null,
      };
    });

    let totalCount = await studentModel.countDocuments(query);

    // let totalCount2 = await studentModel.find(query);
    // totalCount2 = totalCount2.length;

    return send(res, RESPONSE.SUCCESS, studentData, {
      totalCount: totalCount,
      currentPage: page,
      totalPage: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.log("List student:", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
