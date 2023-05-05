import { Sequelize } from "sequelize";
import * as process from "process";

export const sequelize = new Sequelize(process.env.SEQUELIZE);

async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
