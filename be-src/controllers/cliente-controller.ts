import { Cliente } from "../models";

export async function registrarNuevoCliente(datos) {
  const nuevoCliente = Cliente.create(datos);
  return nuevoCliente;
}
