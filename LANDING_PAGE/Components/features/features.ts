import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.html',
  styleUrl: './features.scss'
})
export class FeaturesComponent {
  // las 6 funcionalidades de la plataforma
  funcionalidades = [
    { icono: '📋', titulo: 'Solicitudes personalizadas', desc: 'Crea peticiones detalladas con contexto, budget y preferencias.' },
    { icono: '🤝', titulo: 'Matching con shoppers', desc: 'Algoritmo que conecta tu solicitud con el shopper más adecuado.' },
    { icono: '✨', titulo: 'Recomendaciones curadas', desc: 'Opciones seleccionadas a mano, no listas genéricas de algoritmo.' },
    { icono: '💬', titulo: 'Chat en tiempo real', desc: 'Ajusta, pregunta y decide con tu shopper en la misma conversación.' },
    { icono: '🛒', titulo: 'Delegación de compra', desc: 'El shopper puede completar la transacción directamente por ti.' },
    { icono: '⭐', titulo: 'Sistema de calificaciones', desc: 'Evalúa cada experiencia y mejora el ecosistema de shoppers.' },
  ];
}