import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-founders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './founders.html',
  styleUrl: './founders.scss'
})
export class FoundersComponent {
  // los dos fundadores de Assistly
  fundadores = [
    {
      iniciales: 'MM',
      nombre: 'Mishelle Molina',
      rol: 'CEO & Co-fundadora',
      desc: 'Programadora profesional y visionaria de la tecnología. Apasionada por crear soluciones digitales que cambian la forma en que las personas compran.',
    },
    {
      iniciales: 'DC',
      nombre: 'Danilo Cerno',
      rol: 'CEO & Co-fundador',
      desc: 'Programador profesional y visionario de la tecnología. Enfocado en construir plataformas escalables que conectan personas con experiencias de compra inteligentes.',
    },
  ];
}