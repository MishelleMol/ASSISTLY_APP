import { Routes } from '@angular/router';

// Aquí definimos todas las páginas y en qué URL viven
// loadComponent carga la página solo cuando el usuario la visita (más rápido)
export const routes: Routes = [
  {
    path: '',              // página de inicio "/"
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    title: 'Assistly — Tu Personal Shopper'
  },
  {
    path: 'shoppers',      // página de todos los shoppers "/shoppers"
    loadComponent: () => import('./components/shoppers/shoppers.component').then(m => m.ShoppersComponent),
    title: 'Shoppers — Assistly'
  },
  {
    path: 'solicitud',     // página para crear una solicitud "/solicitud"
    loadComponent: () => import('./components/solicitud/solicitud.component').then(m => m.SolicitudComponent),
    title: 'Nueva Solicitud — Assistly'
  },
  {
    path: 'admin',         // panel de administración "/admin"
    loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent),
    title: 'Panel Admin — Assistly'
  },
  {
    path: '**',            // cualquier URL que no exista
    redirectTo: ''         // manda al inicio
  }
];