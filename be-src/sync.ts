import { sequelize } from "./models/connection";
import { User, Auth, EstadoUser, Cliente, Negocio , Especialidad} from "./models";

Especialidad.sequelize.sync({ alter: true }).then((res) => {
  console.log(res);
  // User.findAll();
});
