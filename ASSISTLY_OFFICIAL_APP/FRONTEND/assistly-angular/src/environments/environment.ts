// URL del backend cuando trabajamos en nuestra computadora (local)
export const environment = {// Exporta un objeto llamado environment para usarlo en toda la app
  production: false,// Indica que NO es producción, sino entorno de desarrollo
  apiUrl: 'http://localhost:3000/api'
};
  // URL del backend local (tu servidor corriendo en tu máquina en el puerto 3000)
  // Incluye /api porque ahí están definidos los endpoints