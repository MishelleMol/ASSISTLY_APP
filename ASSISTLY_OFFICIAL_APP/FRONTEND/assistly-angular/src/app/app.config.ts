import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';// Importa la función para configurar el sistema de rutas
import { provideHttpClient } from '@angular/common/http'; // Importa la función para habilitar el cliente HTTP (peticiones al backend)

import { routes } from './app.routes';// Importa las rutas definidas de la aplicación

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),// Activa el manejo global de errores en el navegador (captura errores no controlados)
    provideRouter(routes),// Configura y activa el sistema de navegación con las rutas definidas
    provideHttpClient(),// Habilita el uso de HTTP (GET, POST, PUT, DELETE) en toda la app
  ]
};