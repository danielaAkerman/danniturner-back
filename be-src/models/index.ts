import { User } from "./user";
import { Auth } from "./auth";
import { Test } from "./test";
import { Estado } from "./estado";

Auth.hasOne(User);
User.belongsTo(Auth);

User.hasOne(Estado)
Estado.belongsTo(User)

export { User, Auth, Test, Estado };
