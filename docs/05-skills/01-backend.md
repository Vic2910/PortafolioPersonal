# Habilidades Backend

## Resumen

| Tecnología | Nivel | Años/Proyectos | Certificación |
|:-----------|:------|:---------------|:--------------|
| Java | Intermedio | 1 proyecto | Ninguna |
| C# | Intermedio | 3 proyectos | Ninguna |
| Spring Boot | Intermedio | 1 proyecto | Ninguna |
| ASP.NET Core | Intermedio | 3 proyectos | Ninguna |
| Node.js | Básico | Referencia | Ninguna |

---

## Java + Spring Boot

### Nivel de Dominio: ⭐⭐ Intermedio

### Conocimientos

| Área | Descripción | Nivel |
|:-----|:------------|:------|
| Sintaxis básica | Variables, tipos, control de flujo | ⭐⭐⭐ |
| POJOs y clases | Encapsulación, herencia, polimorfismo | ⭐⭐⭐ |
| Collections | List, Set, Map,Stream API | ⭐⭐ |
| Excepciones | Try-catch, custom exceptions | ⭐⭐ |
| Spring Core | IoC, Dependency Injection | ⭐⭐ |
| Spring MVC | Controllers, Request Mapping | ⭐⭐ |
| Spring Data JPA | Repositories, Queries | ⭐⭐ |
| Spring Security | Autenticación básica | ⭐ |

### Proyectos Aplicados

| Proyecto | Componentes Implementados |
|:---------|:--------------------------|
| E-commerce | API REST, autenticación, lógica de negocio |

### Ejemplo de Código

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.findAll();
    }
    
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.save(product);
    }
}
```

### Área de Mejora
- Microservicios con Spring Cloud
- Spring Security avanzado
- Testing con JUnit 5

---

## C# + ASP.NET Core

### Nivel de Dominio: ⭐⭐ Intermedio

### Conocimientos

| Área | Descripción | Nivel |
|:-----|:------------|:------|
| Sintaxis básica | Variables, tipos, LINQ | ⭐⭐⭐ |
| POO | Clases, interfaces, generics | ⭐⭐⭐ |
| Entity Framework | ORM, migraciones, queries | ⭐⭐ |
| ASP.NET MVC | Controllers, Views, Razor | ⭐⭐ |
| ASP.NET Core API | REST APIs, Swashbuckle | ⭐⭐ |
| Autenticación | JWT, Identity | ⭐⭐ |
| Dependency Injection | Contenedor IoC nativo | ⭐⭐ |

### Proyectos Aplicados

| Proyecto | Componentes Implementados |
|:---------|:--------------------------|
| Dashboard de Ventas | API REST, Entity Framework, Razor Views |
| Sistema de Autenticación | JWT, Identity, autorización por roles |
| Sistema CRUD | API REST, validación, paginación |

### Ejemplo de Código

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;
    
    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Project>>> GetAll()
    {
        var projects = await _projectService.GetAllAsync();
        return Ok(projects);
    }
    
    [HttpPost]
    public async Task<ActionResult<Project>> Create(ProjectDto dto)
    {
        var project = await _projectService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = project.Id }, project);
    }
}
```

### Área de Mejora
- .NET 8 y nuevas características
- Blazor para UI
- gRPC para microservicios

---

## Node.js

### Nivel de Dominio: ⭐ Básico

### Conocimientos

| Área | Descripción | Nivel |
|:-----|:------------|:------|
| JavaScript ES6+ | Arrow functions, async/await | ⭐⭐ |
| npm | Gestión de paquetes | ⭐⭐ |
| Express básico | Rutas, middleware | ⭐ |
| REST APIs | Diseño de endpoints | ⭐⭐ |

### Notas
- Conocimiento adicional por uso de React y Vite
- No ha desarrollado backend puro con Node.js
- Stack principal es Java/C# para backend

---

## Patrones de Diseño Conocidos

| Patrón | Descripción | Uso |
|:-------|:------------|:----|
| MVC | Model-View-Controller | ASP.NET, Spring MVC |
| Repository | Acceso a datos abstracto | Entity Framework, JPA |
| Dependency Injection | Inversión de dependencias | ASP.NET, Spring |
| Singleton | Una instancia global | Configuración, servicios |
| Factory | Creación de objetos | Creación de servicios |

---

## Buenas Prácticas Backend

### Implementadas
- [x] Separación de capas (Controller → Service → Repository)
- [x] Validación de datos de entrada
- [x] Manejo de errores centralizado
- [x] Autenticación JWT
- [x] CORS configurado

### Por Implementar
- [ ] Rate limiting
- [ ] Caching
- [ ] Logging estructurado
- [ ] Health checks
- [ ] Circuit breaker

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*
