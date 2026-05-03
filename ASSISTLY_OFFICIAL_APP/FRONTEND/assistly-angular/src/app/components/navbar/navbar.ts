import { Component, OnInit } from '@angular/core'; /* Importa Component y OnInit para inicializar datos al cargar */
import { RouterLink, RouterLinkActive } from '@angular/router'; /* Importa herramientas para navegar entre páginas y marcar links activos */
import { CommonModule } from '@angular/common'; /* Importa funciones comunes de Angular como *ngIf y *ngFor */
import { AuthModalComponent } from '../auth-modal/auth-modal'; /* Importa el componente del modal de autenticación */
import { AssistlyService } from '../../services/assistly.service'; /* Importa el servicio que conecta con el backend */
import { Router } from '@angular/router'; /* Permite navegar entre páginas */

@Component({ /* Decorador que configura este componente */
  selector: 'app-navbar', /* Nombre con el que se usa este componente en HTML */
  standalone: true, /* Indica que este componente funciona sin módulo externo */
  imports: [RouterLink, RouterLinkActive, CommonModule, AuthModalComponent], /* Importa lo que el navbar necesita usar */
  templateUrl: './navbar.html', /* Archivo HTML conectado a este componente */
  styleUrls: ['./navbar.css'] /* Archivo CSS conectado a este componente */
})
export class NavbarComponent implements OnInit { /* Implementa OnInit para ejecutar código al cargar */

  isDark = false; /* Guarda si el tema oscuro está activado o no */
  menuAbierto = false; /* Guarda si el menú móvil está abierto o cerrado */
  modalAbierto = false; /* Guarda si el modal está abierto o cerrado */
  tipoModal: 'login' | 'shopper' | 'usuario' = 'login'; /* Define qué tipo de modal se va a mostrar */
  estaLogueado = false; /* Guarda si el usuario está logueado o no */

  constructor(private svc: AssistlyService, private router: Router) {} /* Inyecta el servicio y el router */

  ngOnInit() { /* Se ejecuta automáticamente al cargar el navbar */
    /* Verifica si hay token guardado al iniciar */
    this.estaLogueado = this.svc.isLoggedIn();
    /* Se suscribe a cambios de sesión para actualizar el navbar en tiempo real */
    this.svc.auth$.subscribe((logueado: boolean) => {
      this.estaLogueado = logueado; /* Actualiza el estado cuando el usuario inicia o cierra sesión */
    });
  }

  toggleTheme() { /* Función para cambiar entre modo claro y oscuro */
    this.isDark = !this.isDark; /* Invierte el valor actual de isDark */
    document.documentElement.setAttribute( /* Cambia un atributo en el HTML principal */
      'data-theme', /* Nombre del atributo que controla el tema */
      this.isDark ? 'dark' : 'light' /* Si isDark es true usa dark, si no usa light */
    );
  }

  toggleMenu() { /* Función para abrir o cerrar el menú móvil */
    this.menuAbierto = !this.menuAbierto; /* Invierte el estado del menú */
  }

  abrirModal(tipo: 'login' | 'shopper' | 'usuario') { /* Función que abre el modal según el tipo recibido */
    this.tipoModal    = tipo; /* Guarda el tipo de modal que se mostrará */
    this.modalAbierto = true; /* Activa el modal para mostrarlo */
  }

  cerrarModal() { /* Función para cerrar el modal */
    this.modalAbierto = false; /* Desactiva el modal para ocultarlo */
  }

  cerrarSesion() { /* Función para cerrar sesión */
    this.svc.logout(); /* Borra el token del localStorage */
    this.router.navigate(['']); /* Redirige al inicio */
  }
}