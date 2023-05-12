import { User } from "./user";
import { Auth } from "./auth";
import { EstadoUser } from "./estado-user";
import { Cliente } from "./cliente";
import { Negocio } from "./negocio";
import { Sucursal } from "./sucursal";
import { Especialidad } from "./especialidad";
import { EstadoEspecialidad } from "./estado-especialidad";
import { Prestador } from "./prestador";
import { Horarios } from "./horarios";
import { Turnos } from "./turnos";

Auth.hasOne(User);
User.belongsTo(Auth);

User.hasOne(EstadoUser);
EstadoUser.belongsTo(User);

Negocio.hasMany(Sucursal);
Sucursal.belongsTo(Negocio);

Especialidad.hasOne(EstadoEspecialidad);
EstadoEspecialidad.belongsTo(Especialidad);

Prestador.hasMany(Sucursal);
Sucursal.belongsTo(Prestador);

Prestador.hasMany(Especialidad);
Especialidad.belongsTo(Prestador);

Prestador.hasOne(Horarios);
Horarios.belongsTo(Prestador);

Turnos.hasOne(Prestador);
Prestador.belongsTo(Turnos);

Turnos.hasOne(Especialidad);
Especialidad.belongsTo(Turnos);

Turnos.hasOne(User);
User.belongsTo(Turnos);

export {
  User,
  Auth,
  EstadoUser,
  Cliente,
  Negocio,
  Sucursal,
  Especialidad,
  EstadoEspecialidad,
  Prestador,
  Horarios,
  Turnos,
};
