import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssistlyService, Solicitud } from '../../services/assistly.service';
import { EstadoClassPipe, CategoriaLabelPipe } from '../../pipes/assistly.pipes';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EstadoClassPipe, CategoriaLabelPipe],
  templateUrl: './admin.component.html',
  styleUrls:   ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  loggedIn     = false;   // muestra login o dashboard según esto
  loginError   = '';
  loginLoading = false;
  solicitudes: Solicitud[] = [];
  loadingData  = false;

  loginForm: FormGroup; // formulario de login

  // Las 4 tarjetas de métricas del dashboard
  metricas = [
    { label: 'Total solicitudes', valor: 0 },
    { label: 'Pendientes',         valor: 0 },
    { label: 'En proceso',          valor: 0 },
    { label: 'Completadas',         valor: 0 },
  ];

  constructor(private svc: AssistlyService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Si ya hay token guardado, entra directo al dashboard
    if (this.svc.isLoggedIn()) {
      this.loggedIn = true;
      this.cargarSolicitudes();
    }
  }

  // Hace login real contra MongoDB a través del backend
  doLogin(): void {
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }
    this.loginLoading = true;
    this.loginError   = '';
    const { email, password } = this.loginForm.value;
    this.svc.login(email, password).subscribe({
      next: res => {
        this.loginLoading = false;
        if (res.ok) { this.loggedIn = true; this.cargarSolicitudes(); }
      },
      error: () => {
        this.loginLoading = false;
        this.loginError = 'Credenciales incorrectas.';
      }
    });
  }

  // Cierra sesión
  logout(): void {
    this.svc.logout();
    this.loggedIn    = false;
    this.solicitudes = [];
  }

  // Trae todas las solicitudes del backend (requiere token)
  cargarSolicitudes(): void {
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

  // Cuenta las solicitudes por estado para las tarjetas
  calcularMetricas(): void {
    this.metricas[0].valor = this.solicitudes.length;
    this.metricas[1].valor = this.solicitudes.filter(s => s.estado === 'pendiente').length;
    this.metricas[2].valor = this.solicitudes.filter(s => s.estado === 'en-proceso').length;
    this.metricas[3].valor = this.solicitudes.filter(s => s.estado === 'completada').length;
  }

  // Cambia el estado de una solicitud (PATCH al backend)
  cambiarEstado(id: string, estado: string): void {
    this.svc.actualizarEstado(id, estado).subscribe({ next: () => this.cargarSolicitudes() });
  }

  // Elimina una solicitud (DELETE al backend)
  eliminar(id: string): void {
    if (!confirm('¿Eliminar esta solicitud? No se puede deshacer.')) return;
    this.svc.eliminarSolicitud(id).subscribe({ next: () => this.cargarSolicitudes() });
  }
}