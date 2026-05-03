import { Component } from '@angular/core';/* Importa Component para poder crear un componente en Angular */
import { RouterLink, RouterLinkActive } from '@angular/router';/* Importa herramientas para navegar entre páginas y marcar links activos */
import { CommonModule } from '@angular/common';/* Importa funciones comunes de Angular como *ngIf y *ngFor */
import { AuthModalComponent } from '../auth-modal/auth-modal';/* Importa el componente del modal de autenticación */

@Component({/* Decorador que configura este componente */
  selector: 'app-navbar', /* Nombre con el que se usa este componente en HTML */
  standalone: true,/* Indica que este componente funciona sin módulo externo */
  imports: [RouterLink, RouterLinkActive, CommonModule, AuthModalComponent],/* Importa lo que el navbar necesita usar */
  templateUrl: './navbar.html',/* Archivo HTML conectado a este componente */
  styleUrls: ['./navbar.css']/* Archivo CSS conectado a este componente */
})
export class NavbarComponent {/* Crea la clase del componente Navbar */

  // tema oscuro/claro
  isDark = false;/* Guarda si el tema oscuro está activado o no */

  // menú móvil
  menuAbierto = false;/* Guarda si el menú móvil está abierto o cerrado */

  // modal
  modalAbierto = false;/* Guarda si el modal está abierto o cerrado */
  tipoModal: 'login' | 'shopper'| 'usuario' = 'login';/* Define qué tipo de modal se va a mostrar */

  // cambia entre modo claro y oscuro
  toggleTheme() {/* Función para cambiar entre modo claro y oscuro */
    this.isDark = !this.isDark;/* Invierte el valor actual de isDark */
    document.documentElement.setAttribute(/* Cambia un atributo en el HTML principal */
      'data-theme',/* Nombre del atributo que controla el tema */
      this.isDark ? 'dark' : 'light'/* Si isDark es true usa dark, si no usa light */
    );
  }

  // abre y cierra el menú móvil
  toggleMenu() { /* Función para abrir o cerrar el menú móvil */
    this.menuAbierto = !this.menuAbierto; /* Invierte el estado del menú */
  }

  // abre el modal con el tipo correcto
  abrirModal(tipo: 'login' | 'shopper' | 'usuario') {/* Función que abre el modal según el tipo recibido */
    this.tipoModal    = tipo;/* Guarda si el modal será login o shopper */
    this.modalAbierto = true;/* Activa el modal para mostrarlo */
  }

  // cierra el modal
  cerrarModal() {/* Función para cerrar el modal */
    this.modalAbierto = false;/* Desactiva el modal para ocultarlo */
  }
}