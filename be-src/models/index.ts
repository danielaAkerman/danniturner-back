import { User } from "./user";
import { Auth } from "./auth";
import { EstadoUser } from "./estado-user";
import { Cliente } from "./cliente";
import { Negocio } from "./negocio";
import { Sucursal } from "./sucursal";
import { Especialidad } from "./especialidad";
import { EstadoEspecialidad } from "./estado-especialidad";

Auth.hasOne(User);
User.belongsTo(Auth);

User.hasOne(EstadoUser);
EstadoUser.belongsTo(User);

Negocio.hasMany(Sucursal);
Sucursal.belongsTo(Negocio);

Especialidad.hasOne(EstadoEspecialidad);
EstadoEspecialidad.belongsTo(Especialidad);

export {
  User,
  Auth,
  EstadoUser,
  Cliente,
  Negocio,
  Sucursal,
  Especialidad,
  EstadoEspecialidad,
};
