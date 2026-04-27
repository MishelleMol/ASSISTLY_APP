import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssistlyService, Shopper } from '../../services/assistly.service';
import { EstrellasPipe, CategoriaLabelPipe } from '../../pipes/assistly.pipes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, EstrellasPipe, CategoriaLabelPipe],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {

  // lista de shoppers que vienen del backend
  shoppers: Shopper[] = [];

  // true mientras carga los datos
  loading = true;

  // las 4 estadísticas del hero
  stats = [
    { num: '2.4K+', label: 'solicitudes completadas' },
    { num: '500+',  label: 'shoppers verificados' },
    { num: '4.9★', label: 'calificación promedio' },
    { num: '<5min', label: 'tiempo de respuesta' },
  ];

  constructor(private svc: AssistlyService) {}

  // se ejecuta al cargar la página
  ngOnInit() {
    this.svc.getShoppers().subscribe({
      next: res => {
        this.shoppers = res.data;
        this.loading = false;
      },
      error: () => {
        // si falla, usa datos de ejemplo
        this.loading = false;
        this.shoppers = [
          { nombre: 'Ana Martínez',  iniciales: 'AM', especialidad: 'Moda & Eventos', categorias: ['bodas','outfits'],    calificacion: 4.9, resenas: 284, tarifa: 96,  disponible: true, verificado: true, color: '#3bbc7c' },
          { nombre: 'Karen López',   iniciales: 'KL', especialidad: 'Moda de Lujo',    categorias: ['outfits'],            calificacion: 4.8, resenas: 196, tarifa: 120, disponible: true, verificado: true, color: '#f97316' },
          { nombre: 'Luis Ramírez',  iniciales: 'LR', especialidad: 'Tech & Gadgets',  categorias: ['tecnologia'],         calificacion: 4.9, resenas: 142, tarifa: 80,  disponible: true, verificado: true, color: '#8b5cf6' },
          { nombre: 'Sofía Cruz',    iniciales: 'SC', especialidad: 'Hogar & Deco',    categorias: ['hogar','cumpleanos'], calificacion: 4.7, resenas: 118, tarifa: 88,  disponible: true, verificado: true, color: '#ec4899' },
        ];
      }
    });
  }
}