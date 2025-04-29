import Template from "../models/template.model.js";
import multer from "multer";
import path from "path";

// Configure multer for file upload storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save uploaded files to the 'uploads' folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Create multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype === "application/zip"
    ) {
      cb(null, true); // Allow images and zip files
    } else {
      cb(
        new Error("Invalid file type! Only images and zip files are allowed."),
        false
      );
    }
  },
});

// Controller for uploading a new template
export const uploadTemplate = async (req, res, next) => {
  try {
    console.log("Files received:", req.files); // Log files to verify they're sent
    const { title, description, price, tags } = req.body;
    const previewImage = req.files["previewImage"]?.[0]?.path;
    const templateFile = req.files["templateFile"]?.[0]?.path;

    if (!previewImage || !templateFile) {
      return res
        .status(400)
        .json({ error: "Both previewImage and templateFile are required." });
    }

    const newTemplate = new Template({
      title,
      description,
      price,
      tags: tags ? tags.split(",") : [],
      previewImage,
      fileUrl: templateFile,
      seller: req.user._id,
    });

    const savedTemplate = await newTemplate.save();
    res.status(201).json(savedTemplate);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Controller for getting all templates
export const getAllTemplates = async (req, res, next) => {
  try {
    const templates = await Template.find()
      .populate("seller", "name email") // Populate seller info (name and email)
      .exec();
    res.status(200).json(templates);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Controller for getting a single template by ID
export const getTemplateById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const template = await Template.findById(id)
      .populate("seller", "name email")
      .exec();

    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    res.status(200).json(template);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
