# Lo Propio - Activity Manager

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
git clone <repo-url>
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
