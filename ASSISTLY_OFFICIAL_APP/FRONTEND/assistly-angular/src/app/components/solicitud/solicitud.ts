import { Component } from '@angular/core'; /* Importa Component para crear el componente */
import { CommonModule } from '@angular/common'; /* Importa funciones comunes como *ngIf y *ngFor */
import { FormsModule } from '@angular/forms'; /* Permite usar formularios y [(ngModel)] */
import { AssistlyService } from '../../services/assistly.service'; /* Importa el servicio del backend */
import { Router } from '@angular/router'; /* Permite navegar entre páginas */

@Component({
  selector: 'app-solicitud', /* Nombre del componente en HTML */
  standalone: true, /* Componente independiente sin módulo externo */
  imports: [CommonModule, FormsModule], /* Módulos que necesita */
  templateUrl: './solicitud.html', /* Archivo HTML del componente */
  styleUrls: ['./solicitud.css'], /* Archivo CSS del componente */
})
export class SolicitudComponent {

  /* Paso actual del flujo — ahora son 4 pasos en lugar de 5 */
  paso = 1;

  /* true mientras se envía la solicitud al backend */
  loading = false;

  /* Mensaje de error si algo falla */
  error = '';

  /* Datos del formulario */
  categoria    = ''; /* Categoría elegida por el cliente */
  subcategoria = ''; /* Subcategoría elegida */
  descripcion  = ''; /* Descripción de lo que necesita */
  presupuesto  = 0;  /* Presupuesto del cliente */
  tamano       = ''; /* Tamaño de la solicitud */
  correo       = ''; /* Correo del cliente */

  /* Las 8 categorías del paso 1 */
  categorias = [
    { key: 'bodas',        label: 'Bodas' },
    { key: 'graduaciones', label: 'Graduaciones' },
    { key: 'cumpleanos',   label: 'Cumpleaños' },
    { key: 'outfits',      label: 'Outfits' },
    { key: 'corporativos', label: 'Corporativos' },
    { key: 'hogar',        label: 'Hogar' },
    { key: 'tecnologia',   label: 'Tecnología' },
    { key: 'san-valentin', label: 'San Valentín' },
  ];

  /* Subcategorías de cada categoría */
  subcategorias: Record<string, string[]> = {
    bodas:          ['Vestido de invitada', 'Regalo de lista', 'Decoración nupcial'],
    graduaciones:   ['Outfit de graduación', 'Regalo para graduado/a', 'Look para gala'],
    cumpleanos:     ['Regalo personalizado', 'Decoración de fiesta', 'Outfit de cumpleaños'],
    outfits:        ['Look casual', 'Outfit formal', 'Outfit de trabajo'],
    corporativos:   ['Regalo corporativo', 'Canasta de regalos', 'Gift card'],
    hogar:          ['Decoración de sala', 'Accesorios de cocina', 'Arte y cuadros'],
    tecnologia:     ['Smartphone', 'Laptop', 'Gadgets de regalo'],
    'san-valentin': ['Rosas y flores', 'Set romántico', 'Joyería'],
  };

  /* Las 3 opciones de tamaño de solicitud */
  tamanos = [
    { key: 'pequena', label: 'Pequeña — 1 a 2 horas',   desc: 'Un artículo o consulta rápida.' },
    { key: 'mediana', label: 'Mediana — 2 a 4 horas',   desc: 'Outfit completo o lista de regalos.' },
    { key: 'grande',  label: 'Grande — más de 4 horas', desc: 'Evento completo o múltiples artículos.' },
  ];

  /* Montos rápidos de presupuesto para elegir */
  presupuestos = [300, 500, 800, 1200, 2000];

  constructor(private svc: AssistlyService, private router: Router) {} /* Inyecta el servicio y el router */

  /* Devuelve las subcategorías de la categoría elegida */
  get subcats() {
    return this.subcategorias[this.categoria] || [];
  }

  /* Calcula el porcentaje de la barra de progreso según el paso actual */
  get progreso() {
    return Math.round((this.paso / 3) * 100); /* Ahora son 4 pasos en lugar de 5 */
  }

  /* Avanza al siguiente paso si los campos requeridos están completos */
  siguiente() {
    /* Paso 1: necesita categoría y subcategoría */
    if (this.paso === 1 && (!this.categoria || !this.subcategoria)) return;
    /* Paso 2: necesita descripción de al menos 15 caracteres y presupuesto mayor a 0 */
    if (this.paso === 2 && (this.descripcion.length < 15 || this.presupuesto < 1)) return;
    /* Paso 3: necesita tamaño elegido */
    if (this.paso === 3 && !this.tamano) return;
    /* Avanza al siguiente paso */
    this.paso++;
  }

  /* Regresa al paso anterior */
  anterior() {
    if (this.paso > 1) this.paso--;
  }

  /* Envía la solicitud al backend y redirige a mis-solicitudes */
  confirmar() {
    this.loading = true; /* Activa el estado de carga */
    this.error = ''; /* Limpia errores anteriores */

    /* Obtiene el token para leer el userId si está logueado */
    const token = this.svc.getToken();
    let userId = '';
    if (token) {
      /* Decodifica el JWT para obtener el ID del usuario */
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.id || '';
    }

    /* Envía la solicitud al backend */
    this.svc.crearSolicitud({
      descripcion:  this.descripcion,  /* Descripción de lo que necesita */
      categoria:    this.categoria,    /* Categoría elegida */
      presupuesto:  this.presupuesto,  /* Presupuesto del cliente */
      tamano:       this.tamano,       /* Tamaño de la solicitud */
      clienteEmail: this.correo,       /* Correo del cliente */
      userId:       userId,            /* ID del usuario si está logueado */
    }).subscribe({
      next: () => {
        this.loading = false; /* Desactiva la carga */
        this.paso = 4; /* Va al paso de confirmación */
      },
      error: () => {
        this.loading = false; /* Desactiva la carga */
        this.error = 'Error al enviar. Intenta de nuevo.'; /* Muestra error */
      }
    });
  }

  /* Redirige a mis solicitudes después de confirmar */
  verMisSolicitudes() {
    this.router.navigate(['/mis-solicitudes']); /* Navega a la página de mis solicitudes */
  }

  /* Reinicia el formulario para hacer otra solicitud */
  resetear() {
    this.paso = 1; /* Vuelve al primer paso */
    this.categoria = this.subcategoria = this.descripcion = ''; /* Limpia campos de texto */
    this.presupuesto = 0; /* Limpia presupuesto */
    this.tamano = this.correo = ''; /* Limpia tamaño y correo */
    this.error = ''; /* Limpia errores */
  }
}