import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-value-prop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './value-prop.html',
  styleUrl: './value-prop.scss'
})
export class ValuePropComponent {
  // los 6 items con checkmark
  items = [
    { titulo: 'Reduce tiempo de búsqueda', desc: 'De horas a minutos. Tu tiempo vale más que una búsqueda interminable.' },
    { titulo: 'Mejora la toma de decisiones', desc: 'Con contexto experto y opciones curadas, decides con confianza.' },
    { titulo: 'Experiencia completamente personal', desc: 'No eres un usuario anónimo. Eres una persona con un shopper dedicado.' },
    { titulo: 'Marketplace escalable', desc: 'Red de shoppers verificados que crece con la demanda, sin perder calidad.' },
    { titulo: 'Tecnología + asesoría humana', desc: 'Lo mejor de ambos mundos: velocidad de la tecnología, calidez del trato humano.' },
    { titulo: 'Modelo disruptivo', desc: 'No optimiza el e-commerce existente. Lo repiensa desde cero.' },
  ];
}