import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solution',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solution.html',
  styleUrl: './solution.scss'
})
export class SolutionComponent {
  pills = ['Compra asistida', 'Decisiones inteligentes', 'Tiempo real', 'Personalizado'];

  stats = [
    { valor: '3x', desc: 'más rápido que buscar solo' },
    { valor: '92%', desc: 'de usuarios satisfechos con la primera recomendación' },
  ];
}