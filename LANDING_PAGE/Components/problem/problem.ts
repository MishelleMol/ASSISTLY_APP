import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-problem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './problem.html',
  styleUrl: './problem.scss'
})
export class ProblemComponent {
  // los 4 problemas que muestra la sección
  problemas = [
    { icono: '🔍', titulo: 'Demasiadas opciones', desc: 'Millones de productos sin filtro real. Horas buscando sin llegar a una decisión clara.' },
    { icono: '⏱️', titulo: 'Falta de tiempo', desc: 'El tiempo es el recurso más valioso. Nadie debería gastarlo comparando tallas o especificaciones.' },
    { icono: '🤔', titulo: 'Decisiones difíciles', desc: 'Sin contexto personal ni asesoría, cualquier compra se convierte en una apuesta.' },
    { icono: '😰', titulo: 'Estrés de compra', desc: 'El e-commerce prometió facilidad, pero entregó abrumamiento. Eso tiene que cambiar.' },
  ];
}