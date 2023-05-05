import { User, Auth } from "../models";
import * as jwt from "jsonwebtoken";
const SECRET = process.env.SECRET;

export async function getAuth(email, passHash) {
  const auth = await Auth.findOne({
    where: {
      email,
      password: passHash,
    },
  });
  // Si no hay registro de ese usuario y esa contraseña, devuelve null
  if (auth) {
    const id = auth.dataValues.user_id;
    const token = jwt.sign({ id }, SECRET);
    const user = await User.findByPk(id);
    return { token, user };
  } else {
    return { message: "not found" };
  }
}

export async function signIn(email, passHash) {
  const auth = await Auth.findOne({
    where: {
      email,
      password: passHash,
    },
  });
  // Si no hay registro de ese usuario y esa contraseña, devuelve null
  if (auth) {
    const token = jwt.sign({ id: auth.dataValues.user_id }, SECRET);
    return { token };
  } else {
    return { message: "not found" };
  }
}
