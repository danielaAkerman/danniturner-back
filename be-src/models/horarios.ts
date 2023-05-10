import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Horarios extends Model {}
Horarios.init(
  {
    duracion: { type: DataTypes.INTEGER },
    in_dom: { type: DataTypes.TIME },
    in_lun: { type: DataTypes.TIME },
    in_mar: { type: DataTypes.TIME },
    in_mie: { type: DataTypes.TIME },
    in_jue: { type: DataTypes.TIME },
    in_vie: { type: DataTypes.TIME },
    in_sab: { type: DataTypes.TIME },
    out_dom: { type: DataTypes.TIME },
    out_lun: { type: DataTypes.TIME },
    out_mar: { type: DataTypes.TIME },
    out_mie: { type: DataTypes.TIME },
    out_jue: { type: DataTypes.TIME },
    out_vie: { type: DataTypes.TIME },
    out_sab: { type: DataTypes.TIME },
  },
  { sequelize, modelName: "horarios" }
);
