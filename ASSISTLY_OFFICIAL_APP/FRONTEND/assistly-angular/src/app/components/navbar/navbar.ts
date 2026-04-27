import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  // true = modo oscuro activo
  isDark = false;

  // true = menú móvil abierto
  menuAbierto = false;

  // Cambia entre modo claro y oscuro
  toggleTheme() {
    this.isDark = !this.isDark;
    // Aplica data-theme al <html> para que las variables CSS cambien
    document.documentElement.setAttribute(
      'data-theme',
      this.isDark ? 'dark' : 'light'
    );
  }

  // Abre y cierra el menú en móvil
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
}