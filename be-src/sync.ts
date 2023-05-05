import { sequelize } from "./models/connection";
import { User, Auth, Test } from "./models";

Test.sequelize.sync({ force: true }).then((res) => {
  console.log(res);
  Test.findAll();
});
