import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';                           // carga las páginas según la URL
import { NavbarComponent } from './components/navbar/navbar.component';  // la barra de navegación

@Component({
  selector: 'app-root',       // así se usa en index.html: <app-root>
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <!-- Navbar que aparece en todas las páginas -->
    <app-navbar></app-navbar>

    <!-- Aquí se carga la página según la URL -->
    <main>
      <router-outlet></router-outlet>
    </main>

    <!-- Footer fijo al fondo -->
    <footer class="footer">
      <div class="footer-inner">
        <span class="footer-brand">assist<span>ly</span></span>
        <span class="footer-copy">© 2026 Assistly · Hecho en Guatemala</span>
      </div>
    </footer>
  `,
  styles: [`
    .footer { background: #0f172a; padding: 1.5rem 0; margin-top: 4rem; }
    .footer-inner { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: .5rem; }
    .footer-brand { font-family: 'Fraunces', serif; font-weight: 900; font-size: 1.2rem; color: #fff; }
    .footer-brand span { color: #3bbc7c; }
    .footer-copy { font-size: .78rem; color: rgba(255,255,255,.3); }
  `]
})
export class AppComponent {}