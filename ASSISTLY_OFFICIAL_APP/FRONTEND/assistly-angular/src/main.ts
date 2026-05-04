import { bootstrapApplication } from '@angular/platform-browser';// Importa la función para arrancar la app sin usar módulos (Angular moderno standalone)
import { App } from './app/app';// Importa el componente principal (root) de la aplicación
import { provideRouter } from '@angular/router';// Importa la función para configurar el sistema de rutas
import { provideHttpClient } from '@angular/common/http';// Importa la función para habilitar el cliente HTTP (peticiones al backend)
import { routes } from './app/app.routes';// Importa el archivo donde están definidas las rutas de la app


// Inicializa (arranca) la aplicación Angular usando el componente App como raíz
bootstrapApplication(App, {

  // Configuración global de proveedores (servicios del sistema)
  providers: [
    provideRouter(routes),    // activa las rutas
    provideHttpClient()       // activa las llamadas HTTP al backend
  ]

 // Captura errores si falla el arranque de la app 
}).catch(err => console.error(err));