import { Pipe, PipeTransform } from '@angular/core';

// ── PIPE 1: ESTRELLAS ─────────────────────────────────────────
// Convierte un número como 4.9 en estrellas visuales: ★★★★☆
// Uso en HTML: {{ shopper.calificacion | estrellas }}
@Pipe({ name: 'estrellas', standalone: true })
export class EstrellasPipe implements PipeTransform {
  transform(valor: number): string {
    const llenas = Math.floor(valor); // parte entera: 4.9 → 4
    const vacias = 5 - llenas;        // las que faltan para 5
    return '★'.repeat(llenas) + '☆'.repeat(vacias);
  }
}

// ── PIPE 2: CATEGORIA LABEL ───────────────────────────────────
// Convierte una clave como "bodas" en texto legible: "Bodas"
// Uso en HTML: {{ solicitud.categoria | categoriaLabel }}
@Pipe({ name: 'categoriaLabel', standalone: true })
export class CategoriaLabelPipe implements PipeTransform {
  private labels: Record<string, string> = {
    'bodas':        'Bodas',
    'graduaciones': 'Graduaciones',
    'cumpleanos':   'Cumpleaños',
    'san-valentin': 'San Valentín',
    'outfits':      'Outfits & Moda',
    'corporativos': 'Regalos Corporativos',
    'hogar':        'Hogar & Deco',
    'tecnologia':   'Tecnología'
  };

  transform(valor: string): string {
    return this.labels[valor] ?? valor; // si no encuentra la clave, devuelve el valor tal cual
  }
}

// ── PIPE 3: ESTADO CLASS ──────────────────────────────────────
// Convierte un estado como "pendiente" en una clase CSS de color
// Uso en HTML: <span [class]="solicitud.estado | estadoClass">
@Pipe({ name: 'estadoClass', standalone: true })
export class EstadoClassPipe implements PipeTransform {
  transform(estado: string): string {
    const clases: Record<string, string> = {
      'pendiente':  'badge-pending',   // amarillo
      'en-proceso': 'badge-process',  // azul
      'completada': 'badge-done',     // verde
      'cancelada':  'badge-cancelled' // rojo
    };
    return clases[estado] ?? 'badge-pending';
  }
}