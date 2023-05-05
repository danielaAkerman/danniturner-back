import { sequelize } from "./models/connection";
import { User, Auth, EstadoUser } from "./models";

sequelize.sync({ force: true }).then((res) => {
  console.log(res);
  // User.findAll();
});
