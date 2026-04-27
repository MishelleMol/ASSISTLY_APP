import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssistlyService, Solicitud } from '../../services/assistly.service';
import { EstadoClassPipe, CategoriaLabelPipe } from '../../pipes/assistly.pipes';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, EstadoClassPipe, CategoriaLabelPipe],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class AdminComponent implements OnInit {

  // muestra login o dashboard según esto
  loggedIn = false;
  // mientras espera la respuesta del login
  loginLoading = false;
  // mensaje de error del login
  loginError = '';
  // datos del formulario de login
  loginEmail    = '';
  loginPassword = '';

  // lista de solicitudes del backend
  solicitudes: Solicitud[] = [];
  // mientras carga las solicitudes
  loadingData = false;

  // las 4 métricas del dashboard
  metricas = [
    { label: 'Total',      valor: 0 },
    { label: 'Pendientes', valor: 0 },
    { label: 'En proceso', valor: 0 },
    { label: 'Completadas',valor: 0 },
  ];

  constructor(private svc: AssistlyService) {}

  // si ya hay token, entra directo al dashboard
  ngOnInit() {
    if (this.svc.isLoggedIn()) {
      this.loggedIn = true;
      this.cargarSolicitudes();
    }
  }

  // hace login contra MongoDB
  doLogin() {
    if (!this.loginEmail || !this.loginPassword) return;
    this.loginLoading = true;
    this.loginError   = '';

    this.svc.login(this.loginEmail, this.loginPassword).subscribe({
      next: res => {
        this.loginLoading = false;
        if (res.ok) {
          this.loggedIn = true;
          this.cargarSolicitudes();
        }
      },
      error: () => {
        this.loginLoading = false;
        this.loginError = 'Credenciales incorrectas.';
      }
    });
  }

  // cierra sesión
  logout() {
    this.svc.logout();
    this.loggedIn    = false;
    this.solicitudes = [];
  }

  // trae todas las solicitudes del backend
  cargarSolicitudes() {
    this.loadingData = true;
    this.svc.getSolicitudes().subscribe({
      next: res => {
        this.solicitudes = res.data;
        this.loadingData = false;
        this.calcularMetricas();
      },
      error: () => { this.loadingData = false; }
    });
  }

  // cuenta las solicitudes por estado
  calcularMetricas() {
    this.metricas[0].valor = this.solicitudes.length;
    this.metricas[1].valor = this.solicitudes.filter(s => s.estado === 'pendiente').length;
    this.metricas[2].valor = this.solicitudes.filter(s => s.estado === 'en-proceso').length;
    this.metricas[3].valor = this.solicitudes.filter(s => s.estado === 'completada').length;
  }

  // cambia el estado de una solicitud
  cambiarEstado(id: string, estado: string) {
    this.svc.actualizarEstado(id, estado).subscribe({
      next: () => this.cargarSolicitudes()
    });
  }

  // elimina una solicitud
  eliminar(id: string) {
    if (!confirm('¿Eliminar esta solicitud?')) return;
    this.svc.eliminarSolicitud(id).subscribe({
      next: () => this.cargarSolicitudes()
    });
  }
}