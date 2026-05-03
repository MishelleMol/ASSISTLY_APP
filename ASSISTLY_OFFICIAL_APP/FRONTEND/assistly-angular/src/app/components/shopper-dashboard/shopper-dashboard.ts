import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistlyService } from '../../services/assistly.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopper-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopper-dashboard.html',
  styleUrl: './shopper-dashboard.css',
})
export class ShopperDashboardComponent implements OnInit {
  tabActivo: 'solicitudes' | 'perfil' | 'historial' | 'chat' = 'solicitudes';
  solicitudes: any[] = [];
  historial: any[] = [];
  shopperInfo: any = null;
  cargando = false;

  constructor(private svc: AssistlyService, private router: Router) {}

  ngOnInit() {
    this.cargarPerfil();
    this.cargarSolicitudes();
  }

  cargarPerfil() {
    this.svc.getMe().subscribe({
      next: res => { if (res.ok) this.shopperInfo = res.user; },
      error: () => this.router.navigate([''])
    });
  }

  cargarSolicitudes() {
    this.cargando = true;
    this.svc.getSolicitudes().subscribe({
      next: res => { this.solicitudes = res.data || []; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }

  aceptarSolicitud(id: string) {
    this.svc.actualizarEstado(id, 'en proceso').subscribe({
      next: () => this.cargarSolicitudes()
    });
  }

  cerrarSesion() {
    this.svc.logout();
    this.router.navigate(['']);
  }
}