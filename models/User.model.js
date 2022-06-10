const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    avatar: { 
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    aboutme: {
      type: String,
    },
    genre: {
      type: String,
    },
    birthdate: {
      type: Date,
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const UserModel = model("user", userSchema);

module.exports = UserModel;
