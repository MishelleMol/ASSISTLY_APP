import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),    // activa las rutas
    provideHttpClient()       // activa las llamadas HTTP al backend
  ]
}).catch(err => console.error(err));