import { User, Auth } from "../models";
// import { cloudinary } from "../lib/cloudinary";
import * as jwt from "jsonwebtoken";

const SECRET = process.env.SECRET;

export async function getUserFromToken(token) {
  const tokenData = jwt.verify(token, SECRET);
  const userId = tokenData.id;
  const user = await User.findByPk(userId);

  return user;
}

export async function signUp(email, fullname, passHash) {
  const user = await User.create({
    email,
    fullname,
  });

  const auth = await Auth.create({
    email,
    password: passHash,
    user_id: user.dataValues.id,
  });
  return auth;
}

export async function updateUser(userId, userData, passHash) {
  const updatedUser = await User.update(userData, { where: { id: userId } });
  if (userData.password) {
    userData.password = passHash;
    await Auth.update(userData, { where: { id: userId } });
  }
  return updatedUser;
}
