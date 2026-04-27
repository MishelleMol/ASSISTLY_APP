import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent {
  // guarda si el modo oscuro está activo
  isDark = false;
  // guarda si el menú móvil está abierto
  menuAbierto = false;

  // cambia entre modo claro y oscuro
  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('oscuro', this.isDark);
    document.body.classList.toggle('claro', !this.isDark);
  }

  // abre y cierra el menú en móvil
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
}