import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Turnos extends Model {}
Turnos.init(
  {
    especialidad_id: { type: DataTypes.INTEGER },
    prestador_id: { type: DataTypes.INTEGER },
    cliente_id: { type: DataTypes.INTEGER },
    user_id: { type: DataTypes.INTEGER },
    desde: { type: DataTypes.DATEONLY },
    hasta: { type: DataTypes.DATEONLY },
  },
  { sequelize, modelName: "turnos" }
);
