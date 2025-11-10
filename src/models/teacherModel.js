import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isactive: {
    type: Number,
    default: 1,
  },
  role: {
    //1 : teacher, 2:headmaster
    type: Number,
    required: true,
  },
});

export default mongoose.model("teachers", teacherSchema);
