import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; // para links de navegación
import { CommonModule } from '@angular/common';                  // para *ngIf y *ngFor

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls:   ['./navbar.component.css']
})
export class NavbarComponent {
  isDark = false; // guarda si el modo oscuro está activo

  constructor() {
    // Al cargar, revisa si el usuario ya tenía guardado el tema oscuro
    if (localStorage.getItem('theme') === 'dark') {
      this.isDark = true;
      document.documentElement.dataset['theme'] = 'dark';
    }
  }

  // Cambia entre modo claro y oscuro
  toggleTheme(): void {
    this.isDark = !this.isDark;
    document.documentElement.dataset['theme'] = this.isDark ? 'dark' : 'light';
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light'); // lo recuerda
  }
}