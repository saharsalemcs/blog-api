const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AppError = require("../utils/appError");

const EXT = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const makeUploader = (folder) => {
  const dir = path.join("uploads", folder);
  fs.mkdirSync(dir, { recursive: true });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("FILE --> ", file);
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const fileName = `user-${Date.now()}${EXT[file.mimetype]}`;
      cb(null, fileName);
    },
  });

  fileFilter = (req, file, cb) => {
    if (EXT[file.mimetype]) return cb(null, true);

    cb(new AppError("file must be an image", 400));
  };

  return multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });
};

module.exports = {
  uploadAvatar: makeUploader("avatars").single("avatar"),
  uploadCover: makeUploader("covers").single("cover"),
};
