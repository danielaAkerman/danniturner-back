import { Estado } from "../models";

export async function crearEstado(estado) {
  console.log("El estado es:", estado);
  const estadoCreado = await Estado.create({ nombre: estado });
  return estadoCreado;
}
