# Decisión: Arquitectura de Frontend

## Contexto

El Dashboard de Ventas requiere una interfaz de usuario que:
- Muestre gráficas de ventas en tiempo real
- Permita filtrar datos por período, categoría, etc.
- Sea responsive (funcione en desktop y móvil)
- Tenga buena performance (carga rápida, interacciones fluidas)
- Siga principios de accesibilidad (WCAG 2.2 AA)

Se necesita seleccionar un framework y arquitectura de frontend que cumpla con estos requisitos.

---

## Opciones Evaluadas

### Opción 1: React + Vite

**Pros:**
- Ecosistema más grande y maduro
- Amplia disponibilidad de librerías de componentes
- Gran comunidad y recursos de aprendizaje
- Virtual DOM eficiente para actualizaciones frecuentes
- Soporte excelente para TypeScript

**Contras:**
- JSX puede ser confuso al inicio
- Necesidad de ensamblar múltiples librerías
- Posible over-engineering para dashboards simples

### Opción 2: Angular + Angular CLI

**Pros:**
- Framework completo "out of the box"
- Inyección de dependencias nativa
- TypeScript nativo (no opt-in)
- CLI poderoso para generación de código
- Ideal para equipos grandes y proyectos enterprise

**Contras:**
- Curva de aprendizaje pronunciada
- Boilerplate extenso
- Menor flexibilidad que React
- Tamaño del bundle mayor

### Opción 3: Vue.js + Vite

**Pros:**
- Curva de aprendizaje suave
- Template syntax intuitiva
- Reactividad simple y poderosa
- Excelente documentación oficial
- Bundle size pequeño

**Contras:**
- Ecosistema menor que React
- Menos librerías de componentes disponibles
- Comunidad más pequeña
- Menos opciones de employment market

---

## Decisión Tomada

**Opción seleccionada: React + Vite + Tailwind CSS**

### Justificación

1. **Ecosistema de gráficas:** React tiene las mejores librerías para dashboards (Recharts, Chart.js, Nivo) con amplia documentación y ejemplos.

2. **Performance:** Vite ofrece hot module replacement ultrarrápido y builds optimizados, mejorando la experiencia de desarrollo.

3. **Flexibilidad de diseño:** Tailwind CSS permite crear interfaces personalizadas sin depender de librerías de componentes rígidas.

4. **Demanda laboral:** React es el framework con mayor demanda en el mercado laboral, maximizando la transferibilidad de habilidades.

5. **Comunidad:** La cantidad de tutoriales, librerías y soluciones disponibles es incomparable.

---

## Arquitectura de Componentes

### Estructura de Carpetas

```
src/
├── components/
│   ├── common/           # Componentes reutilizables
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Modal/
│   │   └── Table/
│   ├── charts/           # Componentes de gráficas
│   │   ├── BarChart/
│   │   ├── LineChart/
│   │   ├── PieChart/
│   │   └── DashboardCharts/
│   ├── layout/           # Componentes de layout
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── Footer/
│   │   └── MainLayout/
│   └── features/         # Componentes específicos del dominio
│       ├── dashboard/
│       ├── products/
│       ├── orders/
│       └── users/
├── hooks/                # Custom hooks
│   ├── useAuth.js
│   ├── useDashboard.js
│   └── useApi.js
├── services/             # Servicios API
│   ├── api.js
│   ├── authService.js
│   └── dashboardService.js
├── context/              # React Context
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── utils/                # Utilidades
│   ├── formatters.js
│   └── validators.js
├── pages/                # Páginas/rutas
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Products.jsx
│   └── Orders.jsx
└── App.jsx               # Componente raíz
```

### Patrón de Componentes

```jsx
// Componente funcional con hooks
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesChart = ({ data, period }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setChartData(data);
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-64 rounded"></div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Ventas por {period}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
```

---

## Gestión de Estado

### Opción Seleccionada: React Context + Hooks

Para un dashboard de tamaño pequeño-medio, React Context es suficiente:

```jsx
// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    setUser(response.user);
    return response;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

---

## Manejo de API

### Servicio API Centralizado

```javascript
// services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Intentar refresh token
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return api(error.config);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## Estilo y Diseño

### Configuración de Tailwind CSS

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
}
```

### Paleta de Colores para Dashboard

| Elemento | Color | Uso |
|:---------|:------|:----|
| Fondo principal | `bg-gray-50` | Background de la página |
| Tarjetas | `bg-white` | Contenedores de contenido |
| Texto principal | `text-gray-900` | Títulos y contenido |
| Texto secundario | `text-gray-600` | Descripciones |
| Acento primario | `bg-blue-600` | Botones principales |
| Éxito | `bg-green-500` | Estados positivos |
| Advertencia | `bg-yellow-500` | Estados de cuidado |
| Error | `bg-red-500` | Estados de error |

---

## Accesibilidad

### Implementación WCAG 2.2 AA

```jsx
// Componente accesible
const AccessibleButton = ({ children, onClick, disabled, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        px-4 py-2 rounded-md font-medium
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${disabled 
          ? 'bg-gray-300 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'}
        text-white
      `}
    >
      {children}
    </button>
  );
};
```

### Checklist de Accesibilidad

- [ ] Navegación completa por teclado (Tab, Enter, Space, Escape)
- [ ] Indicadores de foco visibles (`:focus-visible`)
- [ ] Contraste mínimo 4.5:1 para texto
- [ ] Contraste mínimo 3:1 para componentes UI
- [ ] Texto alternativo en imágenes
- [ ] ARIA labels en componentes interactivos
- [ ] Skip to content al inicio del DOM
- [ ] Tamaño mínimo táctil 24px

---

## Consecuencias

### Positivas
- Arquitectura modular y escalable
- Excelente performance con Vite
- Diseño personalizable con Tailwind
- Gran ecosistema de librerías

### Negativas
- Necesidad de configurar múltiples herramientas
- Dependencia de muchas librerías pequeñas
- Posible inconsistencia en estilos sin disciplina

### Riesgos
- Tamaño del bundle si no se optimiza (mitigado con code splitting)
- Performance de rendering con muchos componentes (mitigado con React.memo)

---

## Referencias

- [React Official Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Recharts - Charting Library](https://recharts.org/)

---

**Fecha de decisión:** *[Completar]*
**Tomada por:** *[Nombre del desarrollador]*
**Revisada por:** *[Si aplica]*
