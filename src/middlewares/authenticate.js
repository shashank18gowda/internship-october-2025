import jwt from "jsonwebtoken";
import { send, setErrMsg } from "../helper/responseHelper.js";
import { RESPONSE } from "../config/global.js";

const authenticate = (req, res, next) => {
  try {
    // let token = req.header("access-token");
    let token = req.header("authorization");

    if (!token) {
      return send(res, RESPONSE.ACCESS_DENIED);
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.token = decoded;

    next();
  } catch (error) {
    console.log("Authorization", error);
    return send(res, setErrMsg(RESPONSE.INVALID, "Token"));
  }
};

export default authenticate;
