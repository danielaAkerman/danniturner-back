import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class User extends Model {}
User.init(
  {
    email: { type: DataTypes.STRING },
    apellido: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
    dni: { type: DataTypes.STRING },
    nivel: { type: DataTypes.STRING },
    negocio: { type: DataTypes.STRING },
    estado_id: { type: DataTypes.INTEGER },
  },
  { sequelize, modelName: "user" }
);
