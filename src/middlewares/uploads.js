import multer from "multer";

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );

    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("image/png") ||
    file.mimetype.includes("image/jpeg") ||
    file.mimetype.includes("image/jpg")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    cb(new Error("Only jpeg/png/jpg files are allowed!!"));
  }
};

let maxSize = 1024 * 1024 * 2; //2mB;

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
});

export default upload;
