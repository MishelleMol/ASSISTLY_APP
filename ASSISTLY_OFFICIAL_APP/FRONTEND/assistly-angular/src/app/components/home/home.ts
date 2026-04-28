import { Component, OnInit } from '@angular/core';/* Importa Component para crear el componente y OnInit para ejecutar código al iniciar */
import { RouterLink } from '@angular/router';/* Permite usar routerLink para navegar entre páginas */
import { CommonModule } from '@angular/common';/* Importa funciones comunes como *ngIf y *ngFor */
import { AssistlyService, Shopper } from '../../services/assistly.service';/* Importa el servicio que conecta con el backend y el tipo Shopper */
import { EstrellasPipe, CategoriaLabelPipe } from '../../pipes/assistly.pipes';/* Importa pipes para mostrar estrellas y categorías con formato */

@Component({/* Decorador que configura el componente */
  selector: 'app-home',/* Nombre con el que se usa este componente en HTML */
  standalone: true,/* Indica que funciona sin declararse en un módulo */
  imports: [RouterLink, CommonModule, EstrellasPipe, CategoriaLabelPipe],/* Importa herramientas que usa el componente */
  templateUrl: './home.html',/* Archivo HTML conectado al componente */
  styleUrls: ['./home.css']/* Archivo CSS conectado al componente */
})
export class HomeComponent implements OnInit {/* Crea la clase HomeComponent y usa OnInit */

  shoppers: Shopper[] = [];/* Guarda la lista de shoppers */
  loading = true;/* Indica si la información todavía está cargando */

  // Categoría y subtag activos en la sección de categorías
  catActiva = 'cumpleanos';/* Guarda la categoría activa */
  subActivo = '';/* Guarda el subtag activo */

  // Filtro activo en el directorio
  filtroActivo = 'todos';/* Guarda el filtro activo del directorio */

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
  filtros = [/* Lista de filtros del directorio */
    { id: 'todos', label: 'Todos' },/* Filtro para mostrar todos */
    { id: 'moda',  label: 'Moda' },/* Filtro de moda */
    { id: 'tech',  label: 'Tech' },/* Filtro de tecnología */
    { id: 'hogar', label: 'Hogar' },/* Filtro de hogar */
  ];

  constructor(private svc: AssistlyService) {} /* Inyecta AssistlyService para pedir datos al backend */

  ngOnInit() {/* Método que se ejecuta automáticamente al iniciar el componente */
    this.svc.getShoppers().subscribe({/* Llama al servicio para obtener shoppers del backend */
      next: res => { /* Se ejecuta si el backend responde correctamente */
        this.shoppers = res.data;/* Guarda los shoppers recibidos */
        this.loading = false;/* Indica que ya terminó de cargar */
      },
      error: () => {/* Se ejecuta si ocurre un error al traer los shoppers */
        this.loading = false;/* Detiene el estado de carga */
        this.shoppers = [/* Usa una lista de respaldo si falla el backend */
          { nombre: 'Ana Martínez',  iniciales: 'AM', especialidad: 'Moda & Eventos',  categorias: ['bodas','outfits'],    calificacion: 4.9, resenas: 284, tarifa: 96,  color: '#3bbc7c', disponible: true, verificado: true, tipo: 'moda'  },
          { nombre: 'Karen López',   iniciales: 'KL', especialidad: 'Moda de Lujo',     categorias: ['outfits'],            calificacion: 4.8, resenas: 196, tarifa: 120, color: '#f97316', disponible: true, verificado: true, tipo: 'moda'  },
          { nombre: 'Luis Ramírez',  iniciales: 'LR', especialidad: 'Tech & Gadgets',   categorias: ['tecnologia'],         calificacion: 4.9, resenas: 142, tarifa: 80,  color: '#8b5cf6', disponible: true, verificado: true, tipo: 'tech'  },
          { nombre: 'Sofía Cruz',    iniciales: 'SC', especialidad: 'Hogar & Décor',    categorias: ['hogar','cumpleanos'], calificacion: 4.7, resenas: 118, tarifa: 88,  color: '#ec4899', disponible: true, verificado: true, tipo: 'hogar' },
        ];
      }
    });
  }

  // Devuelve los subtags de la categoría activa
  getSubtags(): string[] {/* Función que devuelve una lista de subtags */
    return this.categorias.find(c => c.id === this.catActiva)?.subs || [];/* Busca la categoría activa y devuelve sus subtags; si no existe devuelve vacío */
  }

  // Devuelve shoppers filtrados por tipo
  getShoppersFiltrados(): Shopper[] {/* Función que devuelve shoppers filtrados */
    if (this.filtroActivo === 'todos') return this.shoppers;/* Si el filtro es todos, devuelve toda la lista */
    return this.shoppers.filter(s => s.tipo === this.filtroActivo);/* Si hay filtro, devuelve solo shoppers de ese tipo */
  }
}