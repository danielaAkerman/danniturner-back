import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "postgres://lwsuikxw:NAQHdpxoo6pZMihSqsSUnKRF0HWUgAbR@motty.db.elephantsql.com/lwsuikxw"
);

async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
