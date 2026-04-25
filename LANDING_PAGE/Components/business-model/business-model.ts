import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-business-model',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business-model.html',
  styleUrl: './business-model.scss'
})
export class BusinessModelComponent {

  // los 3 componentes del precio de cada compra
  revenueStreams = [
    { icono: '🎯', step: '01', tag: 'Fija por solicitud', titulo: 'Tarifa de servicio', desc: 'Cubre el matching y la operación del shopper.', ejemplo: 'Q40 por solicitud' },
    { icono: '📦', step: '02', tag: 'Costo base', titulo: 'Precio del producto', desc: 'Precio real del mercado, siempre visible antes de pagar.', ejemplo: 'Precio real del mercado' },
    { icono: '💰', step: '03', tag: '10% del producto', titulo: 'Comisión Assistly', desc: 'Sostiene tecnología, soporte y crecimiento de la plataforma.', ejemplo: '10% sobre el producto' },
  ];

  // cómo gana el shopper en cada venta
  shopperModel = {
    earns: 8,    // % que recibe el shopper
    retains: 2,  // % que retiene Assistly
  };

  // ejemplo real de una transacción de Q400
  transaccion = {
    producto: 400,
    tarifa: 40,
    comision: 40,
    total: 480,
    shopper: 32,   // 8% de Q400
    neto: 48,      // lo que retiene Assistly
  };

  // métricas clave del modelo
  metricas = [
    { valor: '10%', label: 'comisión sobre cada producto vendido' },
    { valor: 'Q40', label: 'tarifa fija por solicitud de servicio' },
    { valor: '~Q48', label: 'ingreso neto en una compra de Q400' },
    { valor: '0', label: 'membresías o suscripciones requeridas' },
  ];
}