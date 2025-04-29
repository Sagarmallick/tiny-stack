import multer from "multer";
import path from "path";

// Define storage engine for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination for the uploaded files
    cb(null, "uploads/"); // Save files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    // Set the filename format (current timestamp + original filename)
    cb(null, Date.now() + "-" + file.originalname); // Unique filenames with timestamp
  },
});

// Check if the file is an image for the previewImage field and zip for the templateFile field
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "previewImage") {
    // Allow image files (jpg, jpeg, png)
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type for preview image. Only image files are allowed."
        )
      );
    }
  } else if (file.fieldname === "templateFile") {
    // Allow zip files
    if (file.mimetype === "application/zip") {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type for template. Only zip files are allowed.")
      );
    }
  } else {
    cb(new Error("Invalid field name"));
  }
};

// Setup multer instance with storage, file filter, and size limit
const upload = multer({
  storage, // Use custom storage engine
  limits: { fileSize: 50 * 1024 * 1024 }, // Maximum file size (50 MB)
  fileFilter, // Custom file filter function
});

export default upload;
