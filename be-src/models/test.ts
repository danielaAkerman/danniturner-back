import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Test extends Model {}
Test.init(
  {
    name: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
  },
  { sequelize, modelName: "test" }
);
