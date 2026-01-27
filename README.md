# Lo Propio - Activity Manager

**Repositorio**: https://github.com/Dmobri87/Lo-Propio

Aplicacion movil para gestionar actividades del trabajo diario, construida con React Native y Expo.

## Funcionalidades

- **Gestion de Actividades**: Crear, editar, eliminar y visualizar actividades
- **Estados**: Pendiente, En Progreso, Completada
- **Prioridades**: Alta, Media, Baja
- **Categorias**: Reunion, Desarrollo, Administracion, Comunicacion, Planificacion, Revision, Otro
- **Filtros**: Filtra actividades por estado, prioridad, categoria o busqueda
- **Estadisticas**: Visualiza tu productividad diaria y semanal

## Requisitos

- Node.js 18+
- npm o yarn
- Expo CLI
- iOS Simulator (Mac) o Android Emulator

## Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/Dmobri87/Lo-Propio.git
cd Lo-Propio

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

## Comandos Disponibles

| Comando | Descripcion |
|---------|-------------|
| `npm start` | Inicia Expo en modo desarrollo |
| `npm run android` | Ejecuta en Android |
| `npm run ios` | Ejecuta en iOS |
| `npm run web` | Ejecuta en navegador web |

## Ejecutar con Termux (Android)

Puedes ejecutar esta aplicacion directamente desde tu telefono Android usando Termux.

### Requisitos previos

1. Instalar [Termux](https://f-droid.org/en/packages/com.termux/) desde F-Droid (recomendado) o Play Store
2. Instalar [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) desde Play Store
3. Dispositivo con al menos 4GB de RAM

### Paso 1: Configurar Termux

```bash
# Actualizar paquetes
pkg update && pkg upgrade -y

# Instalar Node.js y Git
pkg install nodejs-lts git -y

# Permitir acceso al almacenamiento (opcional)
termux-setup-storage
```

### Paso 2: Clonar e instalar el proyecto

```bash
# Clonar el repositorio
git clone https://github.com/Dmobri87/Lo-Propio.git

# Entrar al directorio
cd Lo-Propio

# Instalar dependencias (puede tomar varios minutos)
npm install
```

### Paso 3: Ejecutar la aplicacion

```bash
# Iniciar con tunnel (recomendado para Termux)
npx expo start --tunnel
```

Cuando aparezca el codigo QR en la terminal:
1. Abre la app **Expo Go** en tu telefono
2. Toca "Scan QR code"
3. Escanea el QR que aparece en Termux

### Solucion de problemas en Termux

| Problema | Solucion |
|----------|----------|
| QR no funciona | Usa `npx expo start --tunnel` |
| Error de ngrok | Ejecuta `npm install -g @expo/ngrok` |
| Proceso muy lento | Cierra otras apps para liberar RAM |
| Error de memoria | Usa `node --max-old-space-size=2048` |
| Termux se cierra | Activa "Acquire wakelock" en notificacion de Termux |

### Tips para Termux

- **Mantener activo**: Desliza la notificacion de Termux y toca "Acquire wakelock" para evitar que Android cierre el proceso
- **Teclado**: Instala un teclado con teclas especiales como Hacker's Keyboard
- **Sesiones**: Desliza desde la izquierda para abrir nuevas sesiones de terminal

## Estructura del Proyecto

```
Lo-Propio/
├── app/                    # Pantallas (Expo Router)
│   ├── (tabs)/            # Navegacion por tabs
│   │   ├── index.tsx      # Lista de actividades
│   │   └── stats.tsx      # Estadisticas
│   ├── activity/          # Pantallas de actividad
│   │   ├── [id].tsx       # Detalle
│   │   ├── new.tsx        # Nueva actividad
│   │   └── edit/[id].tsx  # Editar actividad
│   └── _layout.tsx        # Layout principal
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── constants/         # Constantes y tema
│   ├── context/           # Context API (estado global)
│   ├── services/          # Servicios (almacenamiento)
│   ├── types/             # Tipos TypeScript
│   └── utils/             # Funciones utilitarias
├── assets/                # Imagenes y recursos
├── app.json              # Configuracion de Expo
├── package.json          # Dependencias
└── tsconfig.json         # Configuracion TypeScript
```

## Tecnologias

- **React Native** - Framework movil
- **Expo** - Plataforma de desarrollo
- **Expo Router** - Navegacion basada en archivos
- **TypeScript** - Tipado estatico
- **AsyncStorage** - Almacenamiento local persistente
- **date-fns** - Manejo de fechas

## Proximos Pasos

- [ ] Agregar notificaciones/recordatorios
- [ ] Sincronizacion en la nube
- [ ] Modo oscuro
- [ ] Exportar actividades
- [ ] Integracion con calendario
