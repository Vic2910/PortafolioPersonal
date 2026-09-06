# Habilidades Frontend

## Resumen

| Tecnología | Nivel | Años/Proyectos | Certificación |
|:-----------|:------|:---------------|:--------------|
| React | Intermedio | 1 proyecto | Ninguna |
| Angular | Intermedio | 1 proyecto | Ninguna |
| Vue.js | Intermedio | 1 proyecto | Ninguna |
| Next.js | Básico | 1 proyecto (API) | Ninguna |
| HTML/CSS/JS | Intermedio | Todos los proyectos | Ninguna |
| Tailwind CSS | Intermedio | Por documentar | Ninguna |

---

## React

### Nivel de Dominio: ⭐⭐ Intermedio

### Conocimientos

| Área | Descripción | Nivel |
|:-----|:------------|:------|
| JSX | Sintaxis y componentes | ⭐⭐⭐ |
| Components | Function components, props | ⭐⭐⭐ |
| Hooks | useState, useEffect, useContext | ⭐⭐ |
| Custom Hooks | Lógica reutilizable | ⭐⭐ |
| Context API | State management global | ⭐⭐ |
| React Router | Navegación SPA | ⭐⭐ |
| Forms | Controlled components, validación | ⭐⭐ |
| Fetch API | Llamadas HTTP | ⭐⭐ |

### Proyectos Aplicados

| Proyecto | Componentes Implementados |
|:---------|:--------------------------|
| E-commerce | Lista de productos, carrito, checkout |
| Dashboard | Gráficas, tablas, filtros |

### Ejemplo de Componente

```jsx
import { useState, useEffect } from 'react';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchProjects();
  }, []);
  
  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) return <Spinner />;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};
```

### Hooks que Conoce

| Hook | Descripción | Dominio |
|:-----|:------------|:--------|
| useState | Estado local | ⭐⭐⭐ |
| useEffect | Efectos secundarios | ⭐⭐⭐ |
| useContext | Contexto global | ⭐⭐ |
| useRef | Referencias DOM | ⭐⭐ |
| useCallback | Memoización de funciones | ⭐ |
| useMemo | Memoización de valores | ⭐ |

### Área de Mejora
- Redux o Zustand para state management
- React Query para server state
- Testing con React Testing Library
- React Native para móvil

---

## Angular

### Nivel de Dominio: ⭐⭐ Intermedio

### Conocimientos

| Área | Descripción | Nivel |
|:-----|:------------|:------|
| Components | Decoradores, templates | ⭐⭐⭐ |
| Services | Inyección de dependencias | ⭐⭐ |
| Directives | ngIf, ngFor, custom | ⭐⭐⭐ |
| Forms | Reactive forms, validación | ⭐⭐ |
| Routing | Módulos de rutas | ⭐⭐ |
| HTTP Client | Conexión con APIs | ⭐⭐ |
| RxJS | Observables básicos | ⭐ |

### Proyectos Aplicados

| Proyecto | Componentes Implementados |
|:---------|:--------------------------|
| Sistema CRUD | Formularios, tablas, navegación |

### Ejemplo de Componente

```typescript
@Component({
  selector: 'app-project-list',
  template: `
    <div class="project-grid">
      <div *ngFor="let project of projects" class="project-card">
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
        <div class="tech-stack">
          <span *ngFor="let tech of project.technologies">
            {{ tech }}
          </span>
        </div>
      </div>
    </div>
  `
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  
  constructor(private projectService: ProjectService) {}
  
  ngOnInit() {
    this.projectService.getProjects()
      .subscribe(projects => this.projects = projects);
  }
}
```

### Área de Mejora
- Angular Signals (nuevo sistema de reactividad)
- Angular Material
- Testing con Jasmine/Karma
- Nx para monorepos

---

## Vue.js

### Nivel de Dominio: ⭐⭐ Intermedio

### Conocimientos

| Área | Descripción | Nivel |
|:-----|:------------|:------|
| Options API | Data, methods, computed | ⭐⭐⭐ |
| Composition API | ref, reactive, computed | ⭐⭐ |
| Directives | v-if, v-for, v-model | ⭐⭐⭐ |
| Components | Props, events, slots | ⭐⭐ |
| Vue Router | Navegación | ⭐⭐ |
| Vuex/Pinia | State management | ⭐ |
| Reactivity | Sistema reactivo | ⭐⭐ |

### Proyectos Aplicados

| Proyecto | Componentes Implementados |
|:---------|:--------------------------|
| Chat/Comunicación | UI de chat, lista de contactos, mensajes |

### Ejemplo de Componente

```vue
<template>
  <div class="chat-container">
    <div class="messages">
      <div 
        v-for="message in messages" 
        :key="message.id"
        class="message"
      >
        <span class="sender">{{ message.sender }}</span>
        <p>{{ message.content }}</p>
      </div>
    </div>
    <input 
      v-model="newMessage" 
      @keyup.enter="sendMessage"
      placeholder="Escribe un mensaje..."
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      newMessage: ''
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        this.messages.push({
          id: Date.now(),
          content: this.newMessage
        });
        this.newMessage = '';
      }
    }
  }
}
</script>
```

### Área de Mejora
- Vue 3 Composition API completa
- Pinia para state management
- Nuxt.js para SSR
- Testing con Vitest

---

## HTML/CSS/JavaScript

### Nivel de Dominio: ⭐⭐ Intermedio

### Conocimientos

| Área | Descripción | Nivel |
|:-----|:------------|:------|
| HTML5 | Semántica, accesibilidad | ⭐⭐⭐ |
| CSS3 | Flexbox, Grid, responsive | ⭐⭐⭐ |
| JavaScript ES6+ | Arrow functions, destructuring | ⭐⭐⭐ |
| DOM Manipulation | Selectores, eventos | ⭐⭐⭐ |
| AJAX/Fetch | Llamadas HTTP | ⭐⭐ |
| CSS Variables | Custom properties | ⭐⭐ |
| Animaciones | Transiciones, keyframes | ⭐ |

### Tailwind CSS

| Área | Descripción | Nivel |
|:-----|:------------|:------|
| Utility classes | Spacing, colors, typography | ⭐⭐⭐ |
| Responsive | sm, md, lg, xl | ⭐⭐⭐ |
| Customization | Configuración personalizada | ⭐⭐ |
| Components | Componentes reutilizables | ⭐⭐ |

### Área de Mejora
- CSS-in-JS (styled-components)
- Sass/SCSS
- CSS Grid avanzado
- Animaciones con Framer Motion

---

## Next.js

### Nivel de Dominio: ⭐ Básico

### Conocimientos

| Área | Descripción | Nivel |
|:-----|:------------|:------|
| App Router | Estructura de carpetas | ⭐ |
| Server Components | Componentes del lado del servidor | ⭐ |
| API Routes | Endpoints API | ⭐⭐ |
| Static Generation | Generación estática | ⭐ |
| Dynamic Routes | Rutas dinámicas | ⭐ |

### Notas
- Experiencia principal con API Routes
- No ha usado SSR/SSG extensivamente
- Stack principal es React + Vite

---

## Accesibilidad (a11y)

### Conocimientos Aplicados

| Ámbito | Implementación | Nivel |
|:-------|:---------------|:------|
| Semántica HTML | Elementos correctos | ⭐⭐⭐ |
| ARIA labels | Labels descriptivos | ⭐⭐ |
| Navegación teclado | Tab order, focus | ⭐⭐ |
| Contraste colores | WCAG 2.2 AA | ⭐⭐ |
| Alt text | Imágenes descriptivas | ⭐⭐⭐ |

### Área de Mejora
- axe-core para testing automatizado
- Screen reader testing
- ARIA roles avanzados

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*
