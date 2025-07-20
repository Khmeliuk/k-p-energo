import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Nickname is required"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "mast be unique"],
    loveCase: true,
  },
  role: {
    type: String,
    enum: ["super user", "admin", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 16,
  },
});

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password") || this.isNew) {
      const hash = await bcrypt.hash(this.password, 5);
      this.password = hash;
      next();
    }
    next();
  } catch (error) {
    next();
  }
});

UserSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

const User = mongoose.model("User", UserSchema);
export default User;
