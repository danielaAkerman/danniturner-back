import { sequelize } from "./models/connection";
import { User, Auth, EstadoUser, Cliente } from "./models";

Cliente.sequelize.sync({ alter: true }).then((res) => {
  console.log(res);
  // User.findAll();
});
