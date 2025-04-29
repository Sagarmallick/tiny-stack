import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;
