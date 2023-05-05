import { User } from "./user";
import { Auth } from "./auth";
import { EstadoUser } from "./estado-user";
import { Cliente } from "./cliente";
import { Negocio } from "./negocio";
import { Sucursal } from "./sucursal";

Auth.hasOne(User);
User.belongsTo(Auth);

User.hasOne(EstadoUser);
EstadoUser.belongsTo(User);

Negocio.hasMany(Sucursal);
Sucursal.belongsTo(Negocio);

export { User, Auth, EstadoUser, Cliente , Negocio, Sucursal};
