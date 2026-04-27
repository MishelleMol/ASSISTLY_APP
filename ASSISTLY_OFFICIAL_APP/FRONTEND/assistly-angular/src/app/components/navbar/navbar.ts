import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthModalComponent } from '../auth-modal/auth-modal';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, AuthModalComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  // tema oscuro/claro
  isDark = false;

  // menú móvil
  menuAbierto = false;

  // modal
  modalAbierto = false;
  tipoModal: 'login' | 'shopper' = 'login';

  // cambia entre modo claro y oscuro
  toggleTheme() {
    this.isDark = !this.isDark;
    document.documentElement.setAttribute(
      'data-theme',
      this.isDark ? 'dark' : 'light'
    );
  }

  // abre y cierra el menú móvil
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  // abre el modal con el tipo correcto
  abrirModal(tipo: 'login' | 'shopper') {
    this.tipoModal    = tipo;
    this.modalAbierto = true;
  }

  // cierra el modal
  cerrarModal() {
    this.modalAbierto = false;
  }
}