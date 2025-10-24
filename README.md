# GameRoom - Plataforma de Juegos Web

## Descripción del Proyecto

**GameRoom** es una aplicación web completa desarrollada en **Angular 20** que implementa una sala de juegos multijugador con sistema de autenticación, chat en tiempo real y sistema de puntuaciones globales. La aplicación combina entretenimiento interactivo con tecnologías web modernas.

## Funcionalidades Principales

### Sistema de Autenticación
- **Registro e inicio de sesión** completo de usuarios
- **Guardias de ruta** (AuthGuard/GuestGuard) para proteger contenido
- **Gestión de sesiones** persistente con Supabase
- **Navegación condicional** basada en estado de autenticación

### Colección de Juegos Interactivos

#### 1. **Ahorcado**
- Juego clásico de adivinanza de palabras
- **Sistema de puntuación** basado en intentos restantes
- **Interfaz visual** con imágenes dinámicas del ahorcado
- **Teclado virtual** interactivo para selección de letras

#### 2. **Mayor o Menor (Cartas)**
- Juego de predicción con baraja francesa completa
- **Lógica de comparación** de valores de cartas
- **Sistema de puntuación** progresiva por aciertos consecutivos
- **Gestión de mazo** con cartas aleatorias

#### 3. **Preguntados**
- Trivia de preguntas 
- **Sistema de timer** (20 segundos por pregunta)
- **Preguntas dinámicas** cargadas desde base de datos
- **Múltiples opciones** con validación de respuestas

#### 4. **Snake**
- Implementación completa del clásico juego Snake
- **Detección de colisiones**
- **Sistema de obstáculos** dinámicos
- **Niveles de dificultad** progresivos
- **Control por teclado** y botones táctiles

### Chat en Tiempo Real
- **Mensajería instantánea** entre usuarios conectados
- **Suscripciones en tiempo real** con Supabase
- **Validación de longitud** de mensajes (150 caracteres)
- **Scroll automático** y gestión de estado de mensajes

### Sistema de Puntuaciones Global
- **Ranking por juego** individual
- **Persistencia de puntajes** en base de datos
- **Actualización automática** post-partida

### Perfil de Usuario
- **Sección "Quién Soy"** con información personal
- **Integración con GitHub API** para mostrar datos del desarrollador

## Stack Tecnológico

### Frontend
- **Angular 20** - Framework principal con Signals
- **TypeScript** - Tipado fuerte y programación orientada a objetos
- **Bootstrap 5.3** - Framework CSS responsivo
- **Bootstrap Icons** - Iconografía consistente
- **RxJS** - Programación reactiva y gestión de estados

### Backend & Base de Datos
- **Supabase**
  - Autenticación de usuarios
  - Base de datos PostgreSQL
  - Subscripciones en tiempo real
  - Almacenamiento de archivos

### Herramientas de Desarrollo
- **Angular CLI 20** - Herramientas de construcción y desarrollo
- **Server-Side Rendering (SSR)** - Optimización de rendimiento
- **Lazy Loading** - Carga bajo demanda de módulos
- **Guards & Services** - Arquitectura modular escalable

## Características Técnicas Destacadas

### Arquitectura
- **Arquitectura modular** con lazy loading por feature
- **Separación de responsabilidades** (Services, Components, Guards)
- **Inyección de dependencias** 
- **Gestión de estado** con Angular Signals

### Optimizaciones
- **Code splitting** automático por rutas
- **Carga diferida** de módulos para mejor rendimiento
- **Detección de cambios** optimizada
- **Bundle optimization** para producción

### Experiencia de Usuario
- **Navegación intuitiva** con indicadores visuales
- **Feedback visual** inmediato en todas las interacciones
- **Gestión de estados de carga** y error

## Comandos de Desarrollo

### Servidor de desarrollo
```bash
ng serve
```
Ejecuta la aplicación en `http://localhost:4200/` con recarga automática.

### Construcción
```bash
ng build
```
Compila el proyecto optimizado para producción en `/dist`.

### Testing
```bash
ng test
```
Ejecuta las pruebas unitarias con Karma y Jasmine.

### Server-Side Rendering
```bash
npm run serve:ssr:TrabajoPosta
```
Ejecuta la aplicación con renderizado del lado del servidor.

## 💼 Competencias Demostradas

- **Desarrollo Full-Stack** con tecnologías modernas
- **Integración de APIs** y servicios externos
- **Programación de juegos** y lógica interactiva
- **Implementación de tiempo real** con WebSockets
- **Arquitectura escalable** y mantenible
- **UI/UX Design** responsivo y accesible

---