import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/user.types.ts";

// By default, Mongoose adds an _id property to your schemas.
// When you create a new document with the automatically added _id property, Mongoose creates a new _id of type ObjectId to your document.
const userSchema: Schema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUser>("user", userSchema, "user");

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // never return the password
    delete returnedObject.password;
    // pointless version field
    delete returnedObject.__v;
  },
});
