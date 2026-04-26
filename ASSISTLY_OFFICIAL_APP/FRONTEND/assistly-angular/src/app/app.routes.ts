import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent),
    title: 'Assistly — Tu Personal Shopper'
  },
  {
    path: 'shoppers',
    loadComponent: () => import('./components/shoppers/shoppers').then(m => m.ShoppersComponent),
    title: 'Shoppers — Assistly'
  },
  {
    path: 'solicitud',
    loadComponent: () => import('./components/solicitud/solicitud').then(m => m.SolicitudComponent),
    title: 'Nueva Solicitud — Assistly'
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin').then(m => m.AdminComponent),
    title: 'Panel Admin — Assistly'
  },
  {
    path: '**',
    redirectTo: ''
  }
];