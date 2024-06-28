export enum EstadoViaje {
  Borrador = 0,
  EsperandoConfirmacionConductor = 1,
  ConfirmacionConductor = 2,
  EnCaminoParaRecoger = 3,
  ViajeIniciado = 4,
  ViajeCanceladoPorConductor = 5,
  ViajeCanceladoPorUsuario = 6,
  ViajeCompletado = 7,
  EsperandoRespuestaDelConductor = 10
}

export const EstadoViajeText: { [key: number]: string } = {
  [EstadoViaje.Borrador]: 'Borrado',
  [EstadoViaje.EsperandoConfirmacionConductor]: 'Esperando confirmación del conductor',
  [EstadoViaje.ConfirmacionConductor]: 'Confirmación del conductor',
  [EstadoViaje.EnCaminoParaRecoger]: 'En camino para recoger',
  [EstadoViaje.ViajeIniciado]: 'Viaje iniciado',
  [EstadoViaje.ViajeCanceladoPorConductor]: 'Viaje cancelado por el conductor',
  [EstadoViaje.ViajeCanceladoPorUsuario]: 'Viaje cancelado por el usuario',
  [EstadoViaje.ViajeCompletado]: 'Viaje completado',
  [EstadoViaje.EsperandoRespuestaDelConductor]: 'Esperando respuesta del conductor'
};
