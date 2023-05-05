import { EstadoUser } from "../models";

export async function crearEstado(estado) {
  console.log("El estado es:", estado);
  const estadoCreado = await EstadoUser.create({ nombre: estado });
  return estadoCreado;
}
