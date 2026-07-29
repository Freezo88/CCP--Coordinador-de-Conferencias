export function cargarDatos<T>(clave: string, datosIniciales: T): T {
  const datosGuardados = localStorage.getItem(clave);

  if (datosGuardados) {
    return JSON.parse(datosGuardados);
  }

  return datosIniciales;
}

export function guardarDatos<T>(clave: string, datos: T) {
  localStorage.setItem(clave, JSON.stringify(datos));
}