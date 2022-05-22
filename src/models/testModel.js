const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
  }
});

userSchema.methods = {
  auth: async function (password) {
    return await bcrypt.compare(password, this.password_hash);
  },
};

module.exports = mongoose.model("User", userSchema);
