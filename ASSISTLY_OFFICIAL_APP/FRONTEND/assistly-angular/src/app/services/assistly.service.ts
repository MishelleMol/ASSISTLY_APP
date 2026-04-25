import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // para llamadas HTTP
import { Observable, BehaviorSubject } from 'rxjs';              // para respuestas asíncronas
import { tap } from 'rxjs/operators';                            // para hacer algo con la respuesta
import { environment } from '../../environments/environment';    // URL del backend

// ── INTERFACES: definen cómo lucen los datos ──────────────────

export interface Shopper {
  _id?:         string;
  nombre:       string;
  iniciales:    string;   // letras del avatar, ej: "AM"
  especialidad: string;
  categorias:   string[];
  calificacion: number;
  resenas:      number;
  tarifa:       number;   // precio por hora en Q
  disponible:   boolean;
  verificado:   boolean;
  color:        string;
}

export interface Solicitud {
  _id?:             string;
  descripcion:      string;
  categoria:        string;
  presupuesto:      number;
  tamano?:          string;
  estado?:          string;
  clienteEmail?:    string;
  shopperAsignado?: Shopper;
  createdAt?:       string;
}

export interface HistorialItem {
  solicitudId?: string;
  categoria:    string;
  descripcion:  string;
  presupuesto:  number;
  shopper:      string;
  estado:       string;
  fecha:        string;
}

export interface ApiResponse<T> {
  ok:     boolean;
  total?: number;
  data:   T;
  error?: string;
}

// ── SERVICIO ──────────────────────────────────────────────────
@Injectable({ providedIn: 'root' }) // disponible en toda la app
export class AssistlyService {

  private apiUrl   = environment.apiUrl; // URL del backend según entorno
  private tokenKey = 'assistly_token';   // nombre con el que guardamos el token

  // Avisa cuando el usuario se loguea o cierra sesión
  private authState$ = new BehaviorSubject<boolean>(this.isLoggedIn());
  auth$ = this.authState$.asObservable();

  constructor(private http: HttpClient) {}

  // ── AUTH ──────────────────────────────────────────────────

  // Registra un usuario nuevo en la base de datos
  register(nombre: string, email: string, password: string, rol = 'user'): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { nombre, email, password, rol }).pipe(
      tap((res: any) => {
        if (res.ok && res.token) {
          localStorage.setItem(this.tokenKey, res.token); // guarda el token
          this.authState$.next(true);                      // avisa que está logueado
        }
      })
    );
  }

  // Inicia sesión con email y contraseña
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((res: any) => {
        if (res.ok && res.token) {
          localStorage.setItem(this.tokenKey, res.token);
          this.authState$.next(true);
        }
      })
    );
  }

  // Cierra sesión borrando el token
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authState$.next(false);
  }

  // Revisa si hay un token guardado (significa que está logueado)
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Crea el header con el token para rutas protegidas
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.getToken()}` });
  }

  // Trae el historial de compras del usuario logueado
  getHistorial(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/historial`, { headers: this.getHeaders() });
  }

  // ── SHOPPERS ────────────────────────────────────────────────

  // Trae todos los shoppers, con filtro opcional por categoría
  getShoppers(categoria?: string): Observable<ApiResponse<Shopper[]>> {
    const params = categoria ? `?categoria=${categoria}` : '';
    return this.http.get<ApiResponse<Shopper[]>>(`${this.apiUrl}/shoppers${params}`);
  }

  // Trae un solo shopper por su id
  getShopper(id: string): Observable<ApiResponse<Shopper>> {
    return this.http.get<ApiResponse<Shopper>>(`${this.apiUrl}/shoppers/${id}`);
  }

  // ── SOLICITUDES ──────────────────────────────────────────────

  // Crea una nueva solicitud
  crearSolicitud(sol: Partial<Solicitud>): Observable<ApiResponse<Solicitud>> {
    return this.http.post<ApiResponse<Solicitud>>(`${this.apiUrl}/solicitudes`, sol);
  }

  // Trae todas las solicitudes (solo admin)
  getSolicitudes(): Observable<ApiResponse<Solicitud[]>> {
    return this.http.get<ApiResponse<Solicitud[]>>(`${this.apiUrl}/solicitudes`, { headers: this.getHeaders() });
  }

  // Cambia el estado de una solicitud (solo admin)
  actualizarEstado(id: string, estado: string): Observable<ApiResponse<Solicitud>> {
    return this.http.patch<ApiResponse<Solicitud>>(`${this.apiUrl}/solicitudes/${id}`, { estado }, { headers: this.getHeaders() });
  }

  // Elimina una solicitud (solo admin)
  eliminarSolicitud(id: string): Observable<ApiResponse<Solicitud>> {
    return this.http.delete<ApiResponse<Solicitud>>(`${this.apiUrl}/solicitudes/${id}`, { headers: this.getHeaders() });
  }
}