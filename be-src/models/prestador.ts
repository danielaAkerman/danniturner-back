import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Prestador extends Model {}
Prestador.init(
  {
    email: { type: DataTypes.STRING },
    apellido: { type: DataTypes.STRING },
    nombre: { type: DataTypes.STRING },
    dni: { type: DataTypes.STRING },
    fecha_nac: { type: DataTypes.DATEONLY },
    telefono: { type: DataTypes.INTEGER },
    telefono_alternativo: { type: DataTypes.INTEGER },
    domicilio: { type: DataTypes.STRING },
    matricula: { type: DataTypes.STRING },
    sucursal_id: { type: DataTypes.INTEGER },
    horarios_id: { type: DataTypes.STRING },
    
  },
  { sequelize, modelName: "prestador" }
);
