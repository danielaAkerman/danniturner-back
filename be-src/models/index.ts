import { User } from "./user";
import { Auth } from "./auth";
import { Test } from "./test";

Auth.hasOne(User);
User.belongsTo(Auth);

export { User, Auth, Test };
