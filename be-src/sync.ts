import { sequelize } from "./models/connection";
import { User, Auth, Test, Estado } from "./models";

User.sequelize.sync({ alter: true }).then((res) => {
  console.log(res);
  User.findAll();
});
