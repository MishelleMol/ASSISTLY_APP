import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { RouterLink }        from '@angular/router';
import { AssistlyService, Shopper } from '../../services/assistly.service';
import { EstrellasPipe, CategoriaLabelPipe } from '../../pipes/assistly.pipes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, EstrellasPipe, CategoriaLabelPipe],
  templateUrl: './home.component.html',
  styleUrls:   ['./home.component.css']
})
export class HomeComponent implements OnInit {

  shoppers: Shopper[] = []; // lista de shoppers que vienen del backend
  loading  = true;          // muestra el spinner mientras carga
  error    = '';

  // Las 4 estadísticas del hero
  stats = [
    { num: '2.4K+', label: 'solicitudes completadas' },
    { num: '500+',  label: 'shoppers verificados'    },
    { num: '4.9',   label: 'calificación promedio'   },
    { num: '<5min', label: 'tiempo de respuesta'      }
  ];

  constructor(private svc: AssistlyService) {}

  // Se ejecuta automáticamente al cargar la página
  ngOnInit(): void {
    this.svc.getShoppers().subscribe({
      next:  res => { this.shoppers = res.data; this.loading = false; },
      error: ()  => { this.loading = false; this.usarFallback(); }
    });
  }

  // Si el backend falla, muestra datos de ejemplo
  private usarFallback(): void {
    this.shoppers = [
      { nombre: 'Ana Martínez',  iniciales: 'AM', especialidad: 'Personal Shopper · Moda & Eventos', categorias: ['bodas','outfits'],    calificacion: 4.9, resenas: 284, tarifa: 96,  disponible: true, verificado: true, color: '#3bbc7c' },
      { nombre: 'Karen López',   iniciales: 'KL', especialidad: 'Estilista · Moda de Lujo',           categorias: ['outfits'],            calificacion: 4.8, resenas: 196, tarifa: 120, disponible: true, verificado: true, color: '#f97316' },
      { nombre: 'Luis Ramírez',  iniciales: 'LR', especialidad: 'Tech & Gadgets Specialist',           categorias: ['tecnologia'],         calificacion: 4.9, resenas: 142, tarifa: 80,  disponible: true, verificado: true, color: '#8b5cf6' },
      { nombre: 'Sofía Cruz',    iniciales: 'SC', especialidad: 'Home & Décor · Regalos Únicos',       categorias: ['hogar','cumpleanos'], calificacion: 4.7, resenas: 118, tarifa: 88,  disponible: true, verificado: true, color: '#ec4899' }
    ];
  }
}