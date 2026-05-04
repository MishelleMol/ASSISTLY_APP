import { Component, OnInit } from '@angular/core'; /* Importa Component y OnInit para inicializar datos al cargar */
import { CommonModule } from '@angular/common'; /* Importa funciones comunes como *ngIf y *ngFor */
import { AssistlyService } from '../../services/assistly.service'; /* Importa el servicio del backend */
import { Router } from '@angular/router'; /* Permite navegar entre páginas */

@Component({
  selector: 'app-mis-solicitudes', /* Nombre del componente en HTML */
  standalone: true, /* Componente independiente */
  imports: [CommonModule], /* Módulos que necesita */
  templateUrl: './mis-solicitudes.html', /* Archivo HTML */
  styleUrl: './mis-solicitudes.css', /* Archivo CSS */
})
export class MisSolicitudes implements OnInit {

  /* Lista de solicitudes del usuario */
  solicitudes: any[] = [];

  /* true mientras cargan las solicitudes */
  cargando = false;

  /* Mensaje de error si algo falla */
  error = '';

  /* true si el usuario está logueado */
  logueado = false;

  constructor(private svc: AssistlyService, private router: Router) {} /* Inyecta servicio y router */

  ngOnInit() { /* Se ejecuta al cargar el componente */
    /* Verifica si el usuario está logueado */
    this.logueado = this.svc.isLoggedIn();
    if (this.logueado) {
      /* Si está logueado carga su historial */
      this.cargarSolicitudes();
    }
  }

  cargarSolicitudes() { /* Función para cargar las solicitudes del usuario */
    this.cargando = true; /* Activa el estado de carga */
    this.svc.getHistorial().subscribe({
      next: (res: any) => { /* Se ejecuta si el backend responde bien */
        this.solicitudes = res.historial || []; /* Guarda las solicitudes */
        this.cargando = false; /* Desactiva la carga */
      },
      error: () => { /* Se ejecuta si hay error */
        this.error = 'Error al cargar tus solicitudes.'; /* Muestra error */
        this.cargando = false; /* Desactiva la carga */
      }
    });
  }

  /* Navega a crear una nueva solicitud */
  nuevaSolicitud() {
    this.router.navigate(['/solicitud']);
  }

  /* Devuelve el color del badge según el estado */
  colorEstado(estado: string): string {
    const colores: Record<string, string> = {
      'pendiente':   '#f59e0b', /* Amarillo para pendiente */
      'en-proceso':  '#3b82f6', /* Azul para en proceso */
      'completada':  '#10b981', /* Verde para completada */
      'cancelada':   '#ef4444', /* Rojo para cancelada */
    };
    return colores[estado] || '#6b7280'; /* Gris si no reconoce el estado */
  }
}