import { sequelize } from "./models/connection";
import {
  User,
  Auth,
  EstadoUser,
  Cliente,
  Negocio,
  Especialidad,
  EstadoEspecialidad,
  EstadoTurno,
  Horarios,
  Prestador,
  Sucursal,
  Turnos,
} from "./models";

User.sequelize.sync({ force: true }).then((res) => {
  console.log(res);
  // User.findAll();
});
