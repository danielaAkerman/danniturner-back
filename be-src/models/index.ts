import { User } from "./user";
import { Auth } from "./auth";
import { EstadoUser } from "./estado-user";
import { Cliente } from "./cliente";

Auth.hasOne(User);
User.belongsTo(Auth);

User.hasOne(EstadoUser);
EstadoUser.belongsTo(User);

export { User, Auth, EstadoUser, Cliente };
