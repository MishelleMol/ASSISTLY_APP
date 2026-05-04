import { Component, OnInit } from '@angular/core';/* Importa Component para crear el componente y OnInit para ejecutar código al iniciar */
import { CommonModule } from '@angular/common';/* Importa funciones comunes de Angular como *ngIf y *ngFor */
import { RouterLink } from '@angular/router';/* Permite usar routerLink para navegar entre páginas */
import { FormsModule } from '@angular/forms';/* Permite usar formularios y [(ngModel)] */
import { AssistlyService, Shopper } from '../../services/assistly.service';/* Importa el servicio que conecta con el backend y el tipo Shopper */
import { EstrellasPipe, CategoriaLabelPipe } from '../../pipes/assistly.pipes';/* Importa pipes para mostrar estrellas y categorías con formato */

@Component({/* Decorador que configura el componente */
  selector: 'app-shoppers',/* Nombre con el que se usa este componente en HTML */
  standalone: true,/* Indica que el componente funciona sin declararse en un módulo */
  imports: [CommonModule, RouterLink, FormsModule, EstrellasPipe, CategoriaLabelPipe],/* Importa módulos y pipes que usa este componente */
  templateUrl: './shoppers.html',/* Archivo HTML conectado al componente */
  styleUrls: ['./shoppers.css'],/* Archivo CSS conectado al componente */
})
export class ShoppersComponent implements OnInit {/* Crea la clase del componente y usa OnInit */

  // todos los shoppers del backend
  shoppers: Shopper[] = [];/* Guarda todos los shoppers recibidos del backend */
  // shoppers después de aplicar el filtro
  shoppersFiltrados: Shopper[] = [];/* Guarda los shoppers después de aplicar filtros */
  // mientras carga
  loading = true;/* Indica si la información todavía está cargando */
  // categoría seleccionada en el filtro
  categoriaFiltro = '';/* Guarda la categoría seleccionada en el filtro */
  // cómo se ordenan los shoppers
  ordenFiltro = 'rating';/* Guarda el orden elegido para mostrar shoppers */

  // opciones del filtro de categorías
  categorias = [/* Lista de categorías disponibles para filtrar */
    { key: '',             label: 'Todas' },/* Opción para mostrar todas las categorías */
    { key: 'bodas',        label: 'Bodas' },/* Categoría bodas */
    { key: 'graduaciones', label: 'Graduaciones' }, /* Categoría graduaciones */
    { key: 'outfits',      label: 'Outfits' },/* Categoría outfits */
    { key: 'tecnologia',   label: 'Tecnología' },/* Categoría tecnología */
    { key: 'hogar',        label: 'Hogar' },/* Categoría hogar */
    { key: 'cumpleanos',   label: 'Cumpleaños' },/* Categoría cumpleaños */
  ];

  constructor(private svc: AssistlyService) {}/* Inyecta AssistlyService para pedir datos al backend */

  ngOnInit() {/* Método que se ejecuta automáticamente al iniciar el componente */
    this.svc.getShoppers().subscribe({/* Llama al servicio para obtener shoppers del backend */
      next: res => {/* Se ejecuta si el backend responde correctamente */
        this.shoppers = res.data;/* Guarda los shoppers recibidos */
        this.aplicarFiltros();/* Aplica filtros y orden a la lista */
        this.loading = false;/* Indica que ya terminó de cargar */
      },
      error: () => { /* Se ejecuta si ocurre un error al cargar shoppers */
        this.loading = false;/* Detiene el estado de carga */
        this.shoppers = [/* Usa una lista de shoppers de respaldo */
          { nombre: 'Ana Martínez',  iniciales: 'AM', especialidad: 'Moda & Eventos', categorias: ['bodas','outfits'],    calificacion: 4.9, resenas: 284, tarifa: 96,  disponible: true, verificado: true, color: '#3bbc7c' },
          { nombre: 'Karen López',   iniciales: 'KL', especialidad: 'Moda de Lujo',    categorias: ['outfits'],            calificacion: 4.8, resenas: 196, tarifa: 120, disponible: true, verificado: true, color: '#f97316' },
          { nombre: 'Luis Ramírez',  iniciales: 'LR', especialidad: 'Tech & Gadgets',  categorias: ['tecnologia'],         calificacion: 4.9, resenas: 142, tarifa: 80,  disponible: true, verificado: true, color: '#8b5cf6' },
          { nombre: 'Sofía Cruz',    iniciales: 'SC', especialidad: 'Hogar & Deco',    categorias: ['hogar','cumpleanos'], calificacion: 4.7, resenas: 118, tarifa: 88,  disponible: true, verificado: true, color: '#ec4899' },
        ];
        this.aplicarFiltros();/* Aplica filtros a la lista de respaldo */
      }
    });
  }

  // filtra y ordena los shoppers
  aplicarFiltros() {/* Función para filtrar y ordenar los shoppers */
    let lista = [...this.shoppers];/* Crea una copia de la lista original para no modificarla directamente */

    // filtra por categoría si hay una seleccionada
    if (this.categoriaFiltro) {/* Revisa si hay una categoría seleccionada */
      lista = lista.filter(s => s.categorias.includes(this.categoriaFiltro));/* Deja solo shoppers que tengan esa categoría */
    }

    // ordena según la opción elegida
    if (this.ordenFiltro === 'rating')       lista.sort((a, b) => b.calificacion - a.calificacion);/* Ordena de mayor a menor calificación */
    if (this.ordenFiltro === 'precio_asc')   lista.sort((a, b) => a.tarifa - b.tarifa);/* Ordena por precio de menor a mayor */
    if (this.ordenFiltro === 'precio_desc')  lista.sort((a, b) => b.tarifa - a.tarifa);/* Ordena por precio de mayor a menor */
    this.shoppersFiltrados = lista;/* Guarda la lista final filtrada y ordenada */
  }
}