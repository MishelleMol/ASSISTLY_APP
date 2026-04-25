import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent {
  // productos de ejemplo en el mockup del chat
  productos = [
    { icono: '🌿', nombre: 'Kit jardín aromático premium', precio: 'Q380.00', estrellas: '★★★★★', resenas: '312 reseñas' },
    { icono: '🪴', nombre: 'Set macetas terracota + herramientas', precio: 'Q355.00', estrellas: '★★★★☆', resenas: '198 reseñas' },
  ];
}