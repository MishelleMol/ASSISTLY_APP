import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // manejo de formularios con validaciones
import { AssistlyService, Shopper } from '../../services/assistly.service';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitud.component.html',
  styleUrls:   ['./solicitud.component.css']
})
export class SolicitudComponent {

  paso            = 1;     // paso actual del flujo: 1, 2, 3, 4 o 5 (éxito)
  loading         = false; // true mientras se envía al backend
  errorApi        = '';
  shopperElegido: Shopper | null = null; // el shopper que eligió el usuario

  // El formulario reactivo con sus campos y reglas
  form: FormGroup;

  // Las 8 categorías del paso 1
  categorias = [
    { key: 'bodas',        label: 'Bodas'          },
    { key: 'graduaciones', label: 'Graduaciones'   },
    { key: 'cumpleanos',   label: 'Cumpleaños'     },
    { key: 'san-valentin', label: 'San Valentín'   },
    { key: 'outfits',      label: 'Outfits & Moda' },
    { key: 'corporativos', label: 'Corporativos'   },
    { key: 'hogar',        label: 'Hogar & Deco'   },
    { key: 'tecnologia',   label: 'Tecnología'     },
  ];

  // Subcategorías para cada categoría principal
  subcategorias: Record<string, string[]> = {
    bodas:        ['Vestido de invitada','Regalo de lista','Decoración nupcial','Outfit para despedida'],
    graduaciones: ['Outfit de graduación','Toga y accesorios','Regalo para graduado/a','Look para gala'],
    cumpleanos:   ['Regalo personalizado','Decoración de fiesta','Outfit de cumpleaños','Sorpresa temática'],
    'san-valentin':['Rosas y flores','Set de regalo romántico','Joyería','Experiencia especial'],
    outfits:      ['Look completo casual','Outfit formal/gala','Outfit de trabajo','Asesoría de estilo'],
    corporativos: ['Regalo corporativo','Canasta de regalos','Gift card personalizada','Detalle para cliente'],
    hogar:        ['Decoración de sala','Accesorios de cocina','Arte y cuadros','Plantas y jardín'],
    tecnologia:   ['Smartphone','Laptop o tablet','Accesorios gaming','Gadgets de regalo'],
  };

  subcatSeleccionada = '';

  // Las 3 opciones de tamaño del paso 3
  tamanos = [
    { key: 'pequena', label: 'Pequeña — 1–2 horas',  desc: 'Un artículo o consulta rápida.' },
    { key: 'mediana', label: 'Mediana — 2–4 horas',  desc: 'Outfit completo o lista de regalos.' },
    { key: 'grande',  label: 'Grande — 4+ horas',    desc: 'Evento completo o múltiples categorías.' },
  ];

  // Montos rápidos de presupuesto
  budgetPresets = [300, 500, 800, 1200, 2000];

  // Shoppers que aparecen en el paso 4
  shoppers: Shopper[] = [
    { nombre: 'Ana Martínez',  iniciales: 'AM', especialidad: 'Personal Shopper · Moda & Eventos', categorias: ['bodas','outfits'], calificacion: 4.9, resenas: 284, tarifa: 96,  disponible: true, verificado: true, color: '#3bbc7c' },
    { nombre: 'Karen López',   iniciales: 'KL', especialidad: 'Estilista · Moda de Lujo',           categorias: ['outfits'],        calificacion: 4.8, resenas: 196, tarifa: 120, disponible: true, verificado: true, color: '#f97316' },
    { nombre: 'Luis Ramírez',  iniciales: 'LR', especialidad: 'Tech & Gadgets Specialist',           categorias: ['tecnologia'],     calificacion: 4.9, resenas: 142, tarifa: 80,  disponible: true, verificado: true, color: '#8b5cf6' },
    { nombre: 'Sofía Cruz',    iniciales: 'SC', especialidad: 'Home & Décor · Regalos Únicos',       categorias: ['hogar'],          calificacion: 4.7, resenas: 118, tarifa: 88,  disponible: true, verificado: true, color: '#ec4899' },
  ];

  constructor(private fb: FormBuilder, private svc: AssistlyService) {
    // Creamos el formulario con sus campos y reglas de validación
    this.form = this.fb.group({
      categoria:    ['', Validators.required],
      subcategoria: ['', Validators.required],
      descripcion:  ['', [Validators.required, Validators.minLength(15)]],
      presupuesto:  [null, [Validators.required, Validators.min(1)]],
      tamano:       ['', Validators.required],
      clienteEmail: ['', Validators.email], // opcional, solo valida si está escrito
    });
  }

  // Devuelve las subcategorías de la categoría elegida
  get subcats(): string[] {
    const cat = this.form.get('categoria')?.value;
    return cat ? (this.subcategorias[cat] || []) : [];
  }

  // Calcula el porcentaje de la barra de progreso
  get progreso(): number {
    return Math.round((this.paso / 5) * 100);
  }

  // Guarda la categoría elegida en el formulario
  seleccionarCategoria(key: string): void {
    this.form.patchValue({ categoria: key, subcategoria: '' });
    this.subcatSeleccionada = '';
  }

  // Guarda la subcategoría elegida
  seleccionarSubcat(sub: string): void {
    this.subcatSeleccionada = sub;
    this.form.patchValue({ subcategoria: sub });
  }

  // Guarda el tamaño elegido
  seleccionarTamano(key: string): void {
    this.form.patchValue({ tamano: key });
  }

  // Pone el presupuesto cuando el usuario toca una pastillita
  setBudget(val: number): void {
    this.form.patchValue({ presupuesto: val });
  }

  // Avanza al siguiente paso después de validar
  siguientePaso(): void {
    if (this.paso === 1 && (!this.form.get('categoria')?.value || !this.subcatSeleccionada)) return;
    if (this.paso === 2) {
      this.form.get('descripcion')?.markAsTouched();
      this.form.get('presupuesto')?.markAsTouched();
      if (this.form.get('descripcion')?.invalid || this.form.get('presupuesto')?.invalid) return;
    }
    if (this.paso === 3 && !this.form.get('tamano')?.value) return;
    this.paso++;
  }

  pasoAnterior(): void { if (this.paso > 1) this.paso--; }

  // Guarda el shopper que eligió
  elegirShopper(s: Shopper): void { this.shopperElegido = s; }

  // Envía la solicitud al backend
  confirmar(): void {
    if (!this.shopperElegido) return;
    this.loading  = true;
    this.errorApi = '';
    this.svc.crearSolicitud({
      descripcion:  this.form.value.descripcion,
      categoria:    this.form.value.categoria,
      presupuesto:  this.form.value.presupuesto,
      tamano:       this.form.value.tamano,
      clienteEmail: this.form.value.clienteEmail || '',
    }).subscribe({
      next:  () => { this.loading = false; this.paso = 5; }, // muestra pantalla de éxito
      error: () => { this.loading = false; this.errorApi = 'Error al enviar. Intenta de nuevo.'; }
    });
  }

  // Reinicia todo para crear otra solicitud
  resetear(): void {
    this.paso = 1;
    this.shopperElegido    = null;
    this.subcatSeleccionada = '';
    this.errorApi          = '';
    this.form.reset();
  }
}