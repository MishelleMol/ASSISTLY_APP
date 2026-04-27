import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssistlyService } from '../../services/assistly.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.html',
  styleUrls: ['./auth-modal.css']
})
export class AuthModalComponent implements OnChanges {

  // 'login' = modal simple | 'shopper' = modal dos paneles
  @Input() abierto = false;
  @Input() tipo: 'login' | 'shopper' = 'login';

  @Output() cerrar        = new EventEmitter<void>();
  @Output() abrirShopperE = new EventEmitter<void>();

  tabActivo: 'registro' | 'login' = 'registro';
  modalLoading = false;
  modalError   = '';

  // Registro
  regEmail       = '';
  regNombre      = '';
  regApellido    = '';
  regTelefono    = '';
  regPassword    = '';
  aceptaTerminos = false;
  confirmaEdad   = false;

  // Login
  loginEmail    = '';
  loginPassword = '';

  // Calculador
  zona          = 'gt';
  categoriaCalc = 'moda';
  tarifaEstimada = 144;

  // Tabla de tarifas estimadas
  private tarifas: Record<string, Record<string, number>> = {
    gt:     { moda: 144, tech: 160, hogar: 120, regalos: 130 },
    mix:    { moda: 120, tech: 140, hogar: 100, regalos: 110 },
    villa:  { moda: 110, tech: 130, hogar: 96,  regalos: 100 },
    antigua:{ moda: 160, tech: 180, hogar: 140, regalos: 150 },
  };

  constructor(private svc: AssistlyService) {}

  ngOnChanges() {
    if (this.abierto) {
      this.modalError = '';
      this.tabActivo  = 'registro';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Calcula la tarifa estimada según zona y categoría
  calcular() {
    this.tarifaEstimada = this.tarifas[this.zona]?.[this.categoriaCalc] ?? 120;
  }

  onCerrar() { this.cerrar.emit(); }

  // Le dice al navbar que abra el modal de shopper
  abrirShopper() { this.abrirShopperE.emit(); }

  registrar() {
    if (!this.regEmail || !this.regPassword || !this.regNombre) {
      this.modalError = 'Completa todos los campos requeridos.';
      return;
    }
    this.modalLoading = true;
    this.modalError   = '';

    const nombre = `${this.regNombre} ${this.regApellido}`.trim();

    this.svc.register(nombre, this.regEmail, this.regPassword, 'shopper').subscribe({
      next: res => {
        this.modalLoading = false;
        if (res.ok) { this.onCerrar(); }
        else { this.modalError = res.error || 'Error al crear cuenta.'; }
      },
      error: () => {
        this.modalLoading = false;
        this.modalError = 'Error al conectar. Intenta de nuevo.';
      }
    });
  }

  login() {
    if (!this.loginEmail || !this.loginPassword) {
      this.modalError = 'Ingresa tu correo y contraseña.';
      return;
    }
    this.modalLoading = true;
    this.modalError   = '';

    this.svc.login(this.loginEmail, this.loginPassword).subscribe({
      next: res => {
        this.modalLoading = false;
        if (res.ok) { this.onCerrar(); }
        else { this.modalError = 'Credenciales incorrectas.'; }
      },
      error: () => {
        this.modalLoading = false;
        this.modalError = 'Credenciales incorrectas.';
      }
    });
  }
}