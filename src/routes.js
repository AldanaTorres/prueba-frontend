import React from 'react';

const PrincipalServicioAsociado = React.lazy(() => import('./app/components/servicios/PrincipalServicioAsociado'));
const GestorServicioAsociado = React.lazy(() => import('./app/components/servicios/GestorServicioAsociado'));
const PrincipalVentanilla = React.lazy(() => import('./app/components/ventanillaElectronica/PrincipalVentanilla'));
const GestorVentanilla = React.lazy(() => import('./app/components/ventanillaElectronica/GestorVentanilla'));

const routes = [
  { path: '/public', exact: true, name: 'Inicio' },
  { path: '/private/servicios', exact: true, name: 'Servicios', component: PrincipalServicioAsociado },
  { path: '/private/servicios/nuevo', exact: true, name: 'Nuevo ServicioAsociado', component: GestorServicioAsociado },
  { path: '/private/servicios/:id/editar', exact: true, name: 'Editar GestorServicioAsociado', component: GestorServicioAsociado },

  { path: '/private/notificacion', exact: true, name: 'VentanillaElectronica', component: PrincipalVentanilla },
  { path: '/private/notificacion/:id/:detalle', exact: true, name: 'DetalleVentanillaElectronica', component: GestorVentanilla },
];

export default routes;
