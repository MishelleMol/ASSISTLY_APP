import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss'
})
export class HowItWorksComponent {
  // los 4 pasos del proceso
  pasos = [
    { num: '1', titulo: 'Describe lo que necesitas', desc: 'Escribe tu solicitud en lenguaje natural: un regalo, un outfit, un producto técnico. Sin formularios complicados.' },
    { num: '2', titulo: 'Un shopper acepta tu solicitud', desc: 'En minutos, un personal shopper verificado toma tu caso y empieza a trabajar en tus recomendaciones.' },
    { num: '3', titulo: 'Recibe recomendaciones curadas', desc: 'Opciones personalizadas basadas en tus preferencias, presupuesto y necesidades. Con chat en tiempo real para ajustar.' },
    { num: '4', titulo: 'Elige o delega la compra', desc: 'Decides tú, o dejas que el shopper finalice la compra por ti. Control total, sin esfuerzo.' },
  ];
}