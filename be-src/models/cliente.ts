import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Cliente extends Model {}
Cliente.init(
  {
    email: { type: DataTypes.STRING },
    apellido: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
    dni: { type: DataTypes.STRING },
    fecha_nac: { type: DataTypes.DATEONLY },
    telefono: { type: DataTypes.INTEGER },
    telefono_alternativo: { type: DataTypes.INTEGER },
    domicilio: { type: DataTypes.STRING },
    obra_social: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "cliente" }
);
