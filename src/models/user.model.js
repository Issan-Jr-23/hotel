import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin', 'editor'], // Roles posibles
      default: 'user' // Rol por defecto
    },
  },
  {
    timestamps: true, // Añade automáticamente createdAt y updatedAt
  }
);

export default mongoose.model("User", userSchema);