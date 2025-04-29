// models/template.model.js
import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    tags: [String],
    previewImage: String, // URL or path to image
    fileUrl: String, // URL or path to downloadable template file
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the seller (User model)
      required: true,
    },
  },
  { timestamps: true }
);

const Template = mongoose.model("Template", templateSchema);

export default Template;
