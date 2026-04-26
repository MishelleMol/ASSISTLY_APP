import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink }   from '@angular/router';
import { FormsModule }  from '@angular/forms'; // para usar [(ngModel)] en los selects
import { AssistlyService, Shopper } from '../../services/assistly.service';
import { EstrellasPipe, CategoriaLabelPipe } from '../../pipes/assistly.pipes';

@Component({
  selector: 'app-shoppers',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, EstrellasPipe, CategoriaLabelPipe],
  templateUrl: './shoppers.html',
  styleUrls:   ['./shoppers.css']
})
export class ShoppersComponent implements OnInit {

  shoppers:          Shopper[] = []; // todos los shoppers del backend
  shoppersFiltrados: Shopper[] = []; // shoppers después de aplicar filtros
  loading         = true;
  categoriaFiltro = '';         // categoría seleccionada en el select
  ordenFiltro     = 'rating';   // cómo están ordenados

  // Opciones del filtro de categorías
  categorias = [
    { key: '',             label: 'Todas las categorías' },
    { key: 'bodas',        label: 'Bodas'             },
    { key: 'graduaciones', label: 'Graduaciones'      },
    { key: 'outfits',      label: 'Outfits & Moda'    },
    { key: 'tecnologia',   label: 'Tecnología'        },
    { key: 'hogar',        label: 'Hogar & Deco'      },
    { key: 'cumpleanos',   label: 'Cumpleaños'        },
    { key: 'san-valentin', label: 'San Valentín'      },
  ];

  constructor(private svc: AssistlyService) {}

  ngOnInit(): void {
    this.svc.getShoppers().subscribe({
      next:  res => { this.shoppers = res.data; this.aplicarFiltros(); this.loading = false; },
      error: ()  => { this.loading = false; this.usarFallback(); }
    });
  }

  // Filtra y ordena los shoppers según lo que eligió el usuario
  aplicarFiltros(): void {
    let lista = [...this.shoppers]; // copia para no modificar el original

    if (this.categoriaFiltro) {
      lista = lista.filter(s => s.categorias.includes(this.categoriaFiltro));
    }

    if      (this.ordenFiltro === 'rating')      lista.sort((a, b) => b.calificacion - a.calificacion);
    else if (this.ordenFiltro === 'precio_asc')  lista.sort((a, b) => a.tarifa - b.tarifa);
    else if (this.ordenFiltro === 'precio_desc') lista.sort((a, b) => b.tarifa - a.tarifa);

    this.shoppersFiltrados = lista;
  }

  private usarFallback(): void {
    this.shoppers = [
      { nombre: 'Ana Martínez',  iniciales: 'AM', especialidad: 'Personal Shopper · Moda & Eventos', categorias: ['bodas','outfits','graduaciones'], calificacion: 4.9, resenas: 284, tarifa: 96,  disponible: true, verificado: true, color: '#3bbc7c' },
      { nombre: 'Karen López',   iniciales: 'KL', especialidad: 'Estilista · Moda de Lujo',           categorias: ['outfits','graduaciones'],         calificacion: 4.8, resenas: 196, tarifa: 120, disponible: true, verificado: true, color: '#f97316' },
      { nombre: 'Luis Ramírez',  iniciales: 'LR', especialidad: 'Tech & Gadgets Specialist',           categorias: ['tecnologia','corporativos'],      calificacion: 4.9, resenas: 142, tarifa: 80,  disponible: true, verificado: true, color: '#8b5cf6' },
      { nombre: 'Sofía Cruz',    iniciales: 'SC', especialidad: 'Home & Décor · Regalos Únicos',       categorias: ['hogar','cumpleanos'],             calificacion: 4.7, resenas: 118, tarifa: 88,  disponible: true, verificado: true, color: '#ec4899' },
    ];
    this.aplicarFiltros();
  }
}