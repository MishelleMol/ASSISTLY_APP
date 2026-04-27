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
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  shoppers: Shopper[] = [];
  loading = true;

  // Categoría y subtag activos en la sección de categorías
  catActiva = 'cumpleanos';
  subActivo = '';

  // Filtro activo en el directorio
  filtroActivo = 'todos';

  // Tabs de categorías con sus íconos
  categorias = [
    { id: 'bodas',        icon: '💍', label: 'Bodas',        subs: ['Vestido de novia','Traje de novio','Decoración floral','Regalos para invitados'] },
    { id: 'graduaciones', icon: '🎓', label: 'Graduaciones',  subs: ['Outfit de graduación','Regalo para graduado','Accesorios','Fiesta'] },
    { id: 'outfits',      icon: '👕', label: 'Outfits',       subs: ['Casual','Formal','Deportivo','Noche','Trabajo'] },
    { id: 'regalos',      icon: '🎁', label: 'Regalos',       subs: ['Para ella','Para él','Para niños','Corporativo'] },
    { id: 'cumpleanos',   icon: '🎂', label: 'Cumpleaños',    subs: ['Regalo personalizado','Decoración de fiesta','Outfit de cumpleaños','Sorpresa temática','Mesa de dulces'] },
    { id: 'hogar',        icon: '🏠', label: 'Hogar',         subs: ['Decoración','Muebles','Arte','Cocina'] },
    { id: 'tecnologia',   icon: '💻', label: 'Tecnología',    subs: ['Smartphones','Laptops','Gaming','Accesorios tech'] },
  ];

  // Filtros del directorio
  filtros = [
    { id: 'todos', label: 'Todos' },
    { id: 'moda',  label: 'Moda' },
    { id: 'tech',  label: 'Tech' },
    { id: 'hogar', label: 'Hogar' },
  ];

  constructor(private svc: AssistlyService) {}

  ngOnInit() {
    this.svc.getShoppers().subscribe({
      next: res => {
        this.shoppers = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.shoppers = [
          { nombre: 'Ana Martínez',  iniciales: 'AM', especialidad: 'Moda & Eventos',  categorias: ['bodas','outfits'],    calificacion: 4.9, resenas: 284, tarifa: 96,  color: '#3bbc7c', disponible: true, verificado: true, tipo: 'moda'  },
          { nombre: 'Karen López',   iniciales: 'KL', especialidad: 'Moda de Lujo',     categorias: ['outfits'],            calificacion: 4.8, resenas: 196, tarifa: 120, color: '#f97316', disponible: true, verificado: true, tipo: 'moda'  },
          { nombre: 'Luis Ramírez',  iniciales: 'LR', especialidad: 'Tech & Gadgets',   categorias: ['tecnologia'],         calificacion: 4.9, resenas: 142, tarifa: 80,  color: '#8b5cf6', disponible: true, verificado: true, tipo: 'tech'  },
          { nombre: 'Sofía Cruz',    iniciales: 'SC', especialidad: 'Hogar & Décor',    categorias: ['hogar','cumpleanos'], calificacion: 4.7, resenas: 118, tarifa: 88,  color: '#ec4899', disponible: true, verificado: true, tipo: 'hogar' },
        ];
      }
    });
  }

  // Devuelve los subtags de la categoría activa
  getSubtags(): string[] {
    return this.categorias.find(c => c.id === this.catActiva)?.subs || [];
  }

  // Devuelve shoppers filtrados por tipo
  getShoppersFiltrados(): Shopper[] {
    if (this.filtroActivo === 'todos') return this.shoppers;
    return this.shoppers.filter(s => s.tipo === this.filtroActivo);
  }
}