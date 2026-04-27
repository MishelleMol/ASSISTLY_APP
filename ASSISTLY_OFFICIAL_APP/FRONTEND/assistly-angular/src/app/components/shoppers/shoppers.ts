import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AssistlyService, Shopper } from '../../services/assistly.service';
import { EstrellasPipe, CategoriaLabelPipe } from '../../pipes/assistly.pipes';

@Component({
  selector: 'app-shoppers',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, EstrellasPipe, CategoriaLabelPipe],
  templateUrl: './shoppers.html',
  styleUrls: ['./shoppers.css'],
})
export class ShoppersComponent implements OnInit {

  // todos los shoppers del backend
  shoppers: Shopper[] = [];
  // shoppers después de aplicar el filtro
  shoppersFiltrados: Shopper[] = [];
  // mientras carga
  loading = true;
  // categoría seleccionada en el filtro
  categoriaFiltro = '';
  // cómo se ordenan los shoppers
  ordenFiltro = 'rating';

  // opciones del filtro de categorías
  categorias = [
    { key: '',             label: 'Todas' },
    { key: 'bodas',        label: 'Bodas' },
    { key: 'graduaciones', label: 'Graduaciones' },
    { key: 'outfits',      label: 'Outfits' },
    { key: 'tecnologia',   label: 'Tecnología' },
    { key: 'hogar',        label: 'Hogar' },
    { key: 'cumpleanos',   label: 'Cumpleaños' },
  ];

  constructor(private svc: AssistlyService) {}

  ngOnInit() {
    this.svc.getShoppers().subscribe({
      next: res => {
        this.shoppers = res.data;
        this.aplicarFiltros();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.shoppers = [
          { nombre: 'Ana Martínez',  iniciales: 'AM', especialidad: 'Moda & Eventos', categorias: ['bodas','outfits'],    calificacion: 4.9, resenas: 284, tarifa: 96,  disponible: true, verificado: true, color: '#3bbc7c' },
          { nombre: 'Karen López',   iniciales: 'KL', especialidad: 'Moda de Lujo',    categorias: ['outfits'],            calificacion: 4.8, resenas: 196, tarifa: 120, disponible: true, verificado: true, color: '#f97316' },
          { nombre: 'Luis Ramírez',  iniciales: 'LR', especialidad: 'Tech & Gadgets',  categorias: ['tecnologia'],         calificacion: 4.9, resenas: 142, tarifa: 80,  disponible: true, verificado: true, color: '#8b5cf6' },
          { nombre: 'Sofía Cruz',    iniciales: 'SC', especialidad: 'Hogar & Deco',    categorias: ['hogar','cumpleanos'], calificacion: 4.7, resenas: 118, tarifa: 88,  disponible: true, verificado: true, color: '#ec4899' },
        ];
        this.aplicarFiltros();
      }
    });
  }

  // filtra y ordena los shoppers
  aplicarFiltros() {
    let lista = [...this.shoppers];

    // filtra por categoría si hay una seleccionada
    if (this.categoriaFiltro) {
      lista = lista.filter(s => s.categorias.includes(this.categoriaFiltro));
    }

    // ordena según la opción elegida
    if (this.ordenFiltro === 'rating')       lista.sort((a, b) => b.calificacion - a.calificacion);
    if (this.ordenFiltro === 'precio_asc')   lista.sort((a, b) => a.tarifa - b.tarifa);
    if (this.ordenFiltro === 'precio_desc')  lista.sort((a, b) => b.tarifa - a.tarifa);

    this.shoppersFiltrados = lista;
  }
}