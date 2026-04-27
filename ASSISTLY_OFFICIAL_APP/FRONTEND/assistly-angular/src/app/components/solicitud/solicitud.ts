import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssistlyService } from '../../services/assistly.service';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitud.html',
  styleUrls: ['./solicitud.css'],
})
export class SolicitudComponent {

  // paso actual del flujo (1 al 5)
  paso = 1;
  // true mientras se envía al backend
  loading = false;
  // mensaje de error si falla
  error = '';

  // datos del formulario
  categoria    = '';
  subcategoria = '';
  descripcion  = '';
  presupuesto  = 0;
  tamano       = '';
  correo       = '';
  shopperElegido = '';

  // las 8 categorías del paso 1
  categorias = [
    { key: 'bodas',        label: 'Bodas' },
    { key: 'graduaciones', label: 'Graduaciones' },
    { key: 'cumpleanos',   label: 'Cumpleaños' },
    { key: 'outfits',      label: 'Outfits' },
    { key: 'corporativos', label: 'Corporativos' },
    { key: 'hogar',        label: 'Hogar' },
    { key: 'tecnologia',   label: 'Tecnología' },
    { key: 'san-valentin', label: 'San Valentín' },
  ];

  // subcategorías de cada categoría
  subcategorias: Record<string, string[]> = {
    bodas:         ['Vestido de invitada', 'Regalo de lista', 'Decoración nupcial'],
    graduaciones:  ['Outfit de graduación', 'Regalo para graduado/a', 'Look para gala'],
    cumpleanos:    ['Regalo personalizado', 'Decoración de fiesta', 'Outfit de cumpleaños'],
    outfits:       ['Look casual', 'Outfit formal', 'Outfit de trabajo'],
    corporativos:  ['Regalo corporativo', 'Canasta de regalos', 'Gift card'],
    hogar:         ['Decoración de sala', 'Accesorios de cocina', 'Arte y cuadros'],
    tecnologia:    ['Smartphone', 'Laptop', 'Gadgets de regalo'],
    'san-valentin':['Rosas y flores', 'Set romántico', 'Joyería'],
  };

  // las 3 opciones de tamaño
  tamanos = [
    { key: 'pequena', label: 'Pequeña — 1 a 2 horas',  desc: 'Un artículo o consulta rápida.' },
    { key: 'mediana', label: 'Mediana — 2 a 4 horas',  desc: 'Outfit completo o lista de regalos.' },
    { key: 'grande',  label: 'Grande — más de 4 horas', desc: 'Evento completo o múltiples artículos.' },
  ];

  // montos rápidos de presupuesto
  presupuestos = [300, 500, 800, 1200, 2000];

  // shoppers del paso 4
  shoppers = [
    { nombre: 'Ana Martínez',  iniciales: 'AM', especialidad: 'Moda & Eventos', calificacion: 4.9, tarifa: 96,  color: '#3bbc7c' },
    { nombre: 'Karen López',   iniciales: 'KL', especialidad: 'Moda de Lujo',   calificacion: 4.8, tarifa: 120, color: '#f97316' },
    { nombre: 'Luis Ramírez',  iniciales: 'LR', especialidad: 'Tech & Gadgets', calificacion: 4.9, tarifa: 80,  color: '#8b5cf6' },
    { nombre: 'Sofía Cruz',    iniciales: 'SC', especialidad: 'Hogar & Deco',   calificacion: 4.7, tarifa: 88,  color: '#ec4899' },
  ];

  constructor(private svc: AssistlyService) {}

  // devuelve las subcategorías de la categoría elegida
  get subcats() {
    return this.subcategorias[this.categoria] || [];
  }

  // calcula el % de la barra de progreso
  get progreso() {
    return Math.round((this.paso / 5) * 100);
  }

  // avanza al siguiente paso
  siguiente() {
    if (this.paso === 1 && (!this.categoria || !this.subcategoria)) return;
    if (this.paso === 2 && (this.descripcion.length < 15 || this.presupuesto < 1)) return;
    if (this.paso === 3 && !this.tamano) return;
    if (this.paso === 4 && !this.shopperElegido) return;
    this.paso++;
  }

  // regresa al paso anterior
  anterior() {
    if (this.paso > 1) this.paso--;
  }

  // selecciona el shopper
  elegirShopper(nombre: string) {
    this.shopperElegido = nombre;
  }

  // envía la solicitud al backend
  confirmar() {
    this.loading = true;
    this.error = '';
    this.svc.crearSolicitud({
      descripcion:  this.descripcion,
      categoria:    this.categoria,
      presupuesto:  this.presupuesto,
      tamano:       this.tamano,
      clienteEmail: this.correo,
    }).subscribe({
      next:  () => { this.loading = false; this.paso = 5; },
      error: () => { this.loading = false; this.error = 'Error al enviar. Intenta de nuevo.'; }
    });
  }

  // reinicia el formulario
  resetear() {
    this.paso = 1;
    this.categoria = this.subcategoria = this.descripcion = '';
    this.presupuesto = 0;
    this.tamano = this.correo = this.shopperElegido = '';
    this.error = '';
  }
}