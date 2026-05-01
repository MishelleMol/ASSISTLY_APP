import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';/* Importa herramientas de Angular para crear el componente, recibir datos, enviar eventos y detectar cambios *//* Importa herramientas de Angular para crear el componente, recibir datos, enviar eventos y detectar cambios */
import { CommonModule } from '@angular/common';/* Importa funcionalidades comunes como *ngIf y *ngFor */
import { FormsModule } from '@angular/forms'; /* Permite usar formularios y [(ngModel)] */
import { AssistlyService } from '../../services/assistly.service'; /* Importa el servicio que conecta con el backend */
import { Router } from '@angular/router'; /* Permite navegar entre páginas */



@Component({/* Define la configuración del componente */
  selector: 'app-auth-modal',/* Nombre con el que se usa este componente en HTML */
  standalone: true,/* Indica que el componente funciona de forma independiente */
  imports: [CommonModule, FormsModule],/* Módulos que necesita este componente */
  templateUrl: './auth-modal.html',/* Archivo HTML del componente */
  styleUrls: ['./auth-modal.css']/* Archivo CSS del componente */
})
export class AuthModalComponent implements OnChanges { /* Crea la clase del componente y usa OnChanges para detectar cambios */

  // 'login' = modal simple | 'shopper' = modal dos paneles
  @Input() abierto = false; /* Recibe desde otro componente si el modal está abierto o cerrado */
  @Input() tipo: 'login' | 'shopper'| 'usuario' = 'login';/* Recibe el tipo de modal que se debe mostrar */
 //@input sirve para recibir datos desde el componente padre//


  @Output() cerrar        = new EventEmitter<void>();/* Evento que avisa al componente padre que debe cerrar el modal */
  @Output() abrirShopperE = new EventEmitter<void>();
                                //EventEmitter: herramienta que usa @output para disparar eventos
  @Output() abrirUsuarioE = new EventEmitter<void>();
  @Output() abrirLoginE   = new EventEmitter<void>();

  //@Output: Sirve para enviar eventos del componente padre//

  tabActivo: 'registro' | 'login' = 'registro'; /* Controla si se muestra la pestaña de registro o login */
  modalLoading = false; /* Indica si el modal está cargando */
  modalError   = ''; /* Guarda mensajes de error del modal */

  // Registro
  regEmail       = '';/* Guarda el correo del registro */
  regNombre      = '';/* Guarda el nombre del usuario */
  regApellido    = '';/* Guarda el apellido del usuario */
  regTelefono    = '';/* Guarda el teléfono del usuario */
  regPassword    = '';/* Guarda la contraseña del registro */
  aceptaTerminos = false;/* Guarda si el usuario aceptó términos */
  confirmaEdad   = false;/* Guarda si el usuario confirmó su edad */

  // Login
  loginEmail    = '';/* Guarda el correo del login */
  loginPassword = '';/* Guarda la contraseña del login */

  // Calculador
  zona          = 'gt'; /* Zona seleccionada para calcular tarifa */
  categoriaCalc = 'moda';/* Categoría seleccionada para calcular tarifa */
  tarifaEstimada = 144;/* Tarifa inicial estimada */

  // Tabla de tarifas estimadas
  private tarifas: Record<string, Record<string, number>> = {/* Tabla privada de tarifas según zona y categoría */
    gt:     { moda: 144, tech: 160, hogar: 120, regalos: 130 }, /* Tarifas para zona gt */
    mix:    { moda: 120, tech: 140, hogar: 100, regalos: 110 }, /* Tarifas para zona mix */
    villa:  { moda: 110, tech: 130, hogar: 96,  regalos: 100 },/* Tarifas para Villa */
    antigua:{ moda: 160, tech: 180, hogar: 140, regalos: 150 },/* Tarifas para Antigua */
  };

  constructor(private svc: AssistlyService, private router: Router) {}/* Inyecta el servicio para usar login y registro */

  ngOnChanges() { /* Se ejecuta cuando cambia algún @Input */
    if (this.abierto) {/* Si el modal está abierto */
      this.modalError = '';/* Limpia errores anteriores */
      this.tabActivo  = 'registro';/* Coloca la pestaña de registro como activa */
      document.body.style.overflow = 'hidden'; /* Bloquea el scroll de la página */
    } else { /* Si el modal está cerrado */
      document.body.style.overflow = ''; /* Reactiva el scroll de la página */
    }
  }

  // Calcula la tarifa estimada según zona y categoría
  calcular() { /* Calcula la tarifa estimada */
    this.tarifaEstimada = this.tarifas[this.zona]?.[this.categoriaCalc] ?? 120; /* Busca tarifa según zona y categoría; si no existe usa 120 */
  }

  onCerrar() { this.cerrar.emit(); }  /* Emite el evento para cerrar el modal */

  // Le dice al navbar que abra el modal de shopper
  abrirShopper() { this.abrirShopperE.emit(); }/* Emite el evento para abrir el modal shopper */

  abrirUsuario() { this.abrirUsuarioE.emit(); }

  /* Emite el evento para abrir el modal de login */
  abrirLogin() { this.abrirLoginE.emit(); }  

  registrar() { /* Función para registrar usuario */
    if (!this.regEmail || !this.regPassword || !this.regNombre) {/* Valida que los campos obligatorios estén llenos */
      this.modalError = 'Completa todos los campos requeridos.';/* Muestra mensaje de error */
      return;
    }
    this.modalLoading = true;/* Activa el estado de carga */
    this.modalError   = '';/* Limpia errores anteriores */

    const nombre = `${this.regNombre} ${this.regApellido}`.trim();/* Une nombre y apellido en una sola variable */

    const rol = this.tipo === 'usuario' ? 'user' : 'shopper';

    this.svc.register(nombre, this.regEmail, this.regPassword, rol).subscribe({ /* Envía los datos de registro al backend */
      next: res => {/* Se ejecuta si el backend responde bien */
        this.modalLoading = false;/* Desactiva la carga */
        if (res.ok) { this.onCerrar(); }/* Si el registro fue exitoso, cierra el modal */
        else { this.modalError = res.error || 'Error al crear cuenta.'; }/* Si falla, muestra el error */
      },
      error: () => { /* Se ejecuta si hay error de conexión */
        this.modalLoading = false;/* Desactiva la carga */
        this.modalError = 'Error al conectar. Intenta de nuevo.';/* Muestra mensaje de error */
      }
    });
  }

  login() { /* Función para iniciar sesión */
    if (!this.loginEmail || !this.loginPassword) { /* Valida que correo y contraseña estén llenos */
      this.modalError = 'Ingresa tu correo y contraseña.'; /* Muestra mensaje de error */
      return; /* Detiene la función */
    }
    this.modalLoading = true; /* Activa estado de carga */
    this.modalError   = ''; /* Limpia errores anteriores */

    this.svc.login(this.loginEmail, this.loginPassword).subscribe({ /* Envía correo y contraseña al backend */
      next: (res: any) => { /* Se ejecuta si el backend responde correctamente */
        this.modalLoading = false; /* Desactiva la carga */
        if (res.ok) {
          this.onCerrar(); /* Cierra el modal */
          const token = this.svc.getToken(); /* Obtiene el token guardado */
          if (token) {
            /* Decodifica el payload del JWT para leer el rol */
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.rol === 'shopper') {
              /* Si es shopper, redirige al dashboard de shopper */
              this.router.navigate(['/shopper-dashboard']);
            } else if (payload.rol === 'admin') {
              /* Si es admin, redirige al panel de administrador */
              this.router.navigate(['/admin']);
            }
            /* Si es user normal, se queda en la página actual */
          }
        } else {
          this.modalError = 'Credenciales incorrectas.'; /* Si falla, muestra error */
        }
      },
      error: () => { /* Se ejecuta si ocurre un error */
        this.modalLoading = false; /* Desactiva la carga */
        this.modalError = 'Credenciales incorrectas.'; /* Muestra mensaje de error */
      }
    });
  }
}
