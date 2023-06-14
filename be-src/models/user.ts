import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class User extends Model {}
User.init(
  {
    email: { type: DataTypes.STRING },
    apellido: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
    dni: { type: DataTypes.STRING },
    nivel_permisos: { type: DataTypes.STRING },
    negocio: { type: DataTypes.STRING },
    fecha_nacimiento: { type: DataTypes.DATEONLY },
    estado_user_id: { type: DataTypes.INTEGER },
  },
  { sequelize, modelName: "user" }
);
