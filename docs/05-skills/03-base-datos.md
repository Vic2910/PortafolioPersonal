# Habilidades de Bases de Datos

## Resumen

| Tecnología | Nivel | Tipo | Proyectos |
|:-----------|:------|:-----|:----------|
| PostgreSQL | Intermedio | Relacional | E-commerce |
| MySQL | Intermedio | Relacional | CRUD |
| MongoDB | Básico | NoSQL | Chat, Sistema Contable |
| SQL Server | Básico | Relacional | Referencia |

---

## PostgreSQL

### Nivel de Dominio: ⭐⭐ Intermedio

### Conocimientos

| Área | Descripción | Nivel |
|:-----|:------------|:------|
| SQL básico | SELECT, INSERT, UPDATE, DELETE | ⭐⭐⭐ |
| Joins | INNER, LEFT, RIGHT, FULL | ⭐⭐⭐ |
| Subqueries | Subconsultas | ⭐⭐ |
| Aggregate functions | GROUP BY, HAVING | ⭐⭐⭐ |
| Indexes | Índices simples y compuestos | ⭐⭐ |
| Constraints | PK, FK, UNIQUE, CHECK | ⭐⭐⭐ |
| Views | Vistas | ⭐⭐ |
| Triggers | Triggers básicos | ⭐ |
| Stored Procedures | Procedimientos almacenados | ⭐ |

### Ejemplos de Queries

```sql
-- Query con JOIN y agregación
SELECT 
    p.name AS project_name,
    COUNT(t.id) AS total_tasks,
    AVG(t.estimated_hours) AS avg_hours
FROM projects p
LEFT JOIN tasks t ON p.id = t.project_id
WHERE p.status = 'active'
GROUP BY p.name
HAVING COUNT(t.id) > 5;

-- Índice compuesto
CREATE INDEX idx_projects_status_date 
ON projects(status, created_at);

-- Vista materializada
CREATE VIEW active_projects AS
SELECT id, name, status, created_at
FROM projects
WHERE status = 'active';
```

### Integración con ORMs

| ORM | Lenguaje | Experiencia |
|:----|:---------|:------------|
| Entity Framework | C# | ⭐⭐ |
| Spring Data JPA | Java | ⭐⭐ |
| Sequelize | JavaScript | ⭐ |

### Área de Mejora
- Particionamiento de tablas
- Optimización de queries complejas
- Replicación y clustering
- PostgreSQL avanzado (JSONB, CTEs)

---

## MySQL

### Nivel de Dominio: ⭐⭐ Intermedio

### Conocimientos

| Área | Descripción | Nivel |
|:-----|:------------|:------|
| SQL básico | CRUD operations | ⭐⭐⭐ |
| Joins | Tipos de joins | ⭐⭐⭐ |
| Indexes | Tipos de índices | ⭐⭐ |
| Stored Procedures | Procedimientos | ⭐⭐ |
| Triggers | Triggers | ⭐ |
| Views | Vistas | ⭐⭐ |
| Transactions | ACID, BEGIN, COMMIT | ⭐⭐ |

### Diferencias con PostgreSQL

| Característica | MySQL | PostgreSQL |
|:---------------|:------|:-----------|
| JSON support | JSON type | JSONB (mejor) |
| Full-text search | Limitado | Avanzado |
| Extensions | Plugins | Extensions nativas |
| Standards SQL | Menos compatible | Más compatible |

### Ejemplo de Procedimiento

```sql
DELIMITER //

CREATE PROCEDURE GetProjectStats(IN project_id INT)
BEGIN
    SELECT 
        COUNT(*) as total_tasks,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
        AVG(estimated_hours) as avg_hours
    FROM tasks
    WHERE project_id = project_id;
END //

DELIMITER ;
```

### Área de Mejora
- MySQL 8.0 nuevas características
- Optimización de rendimiento
- Replicación maestro-esclavo

---

## MongoDB

### Nivel de Dominio: ⭐ Básico

### Conocimientos

| Área | Descripción | Nivel |
|:-----|:------------|:------|
| Documentos | Estructura JSON/BSON | ⭐⭐ |
| Colecciones | CRUD operations | ⭐⭐ |
| Queries básicas | find, insert, update | ⭐⭐ |
| Operadores | $gt, $in, $regex | ⭐ |
| Índices | Índices simples | ⭐ |
| Aggregation | Pipeline básico | ⭐ |

### Ejemplo de Documento

```javascript
// Estructura de proyecto
{
  _id: ObjectId("..."),
  name: "Chat Application",
  description: "Real-time chat system",
  technologies: ["Vue.js", "Spring Boot", "MongoDB"],
  status: "completed",
  createdAt: ISODate("2026-05-15"),
  metadata: {
    totalMessages: 1500,
    activeUsers: 50
  }
}

// Query con aggregation
db.messages.aggregate([
  { $match: { roomId: "room123" } },
  { $group: { 
      _id: "$sender", 
      messageCount: { $sum: 1 },
      lastMessage: { $max: "$createdAt" }
  }},
  { $sort: { messageCount: -1 } }
]);
```

### Cuándo Usar MongoDB

| Caso de Uso | Recomendado | Razón |
|:------------|:------------|:------|
| Datos estructurados | No | Usar PostgreSQL |
| Datos semi-estructurados | Sí | Flexibilidad de esquema |
| Real-time analytics | Sí | Escalabilidad horizontal |
| Contenido de chat | Sí | documentos anidados |
| Transacciones complejas | No | Usar base relacional |

### Área de Mejora
- Aggregation pipelines avanzados
- MongoDB Atlas (cloud)
- Réplica sets y sharding
- Mongoose ODM

---

## SQL Server

### Nivel de Dominio: ⭐ Básico (Referencia)

### Conocimientos

| Área | Descripción | Nivel |
|:-----|:------------|:------|
| SQL básico | CRUD operations | ⭐⭐ |
| T-SQL | Extensiones Microsoft | ⭐ |
| Stored Procedures | Procedimientos | ⭐ |
| Entity Framework | ORM con .NET | ⭐⭐ |

### Notas
- Experiencia limitada a proyectos académicos
- Conocimiento adquirido documentación
- Stack principal usa PostgreSQL/MySQL

---

## Decisiones de Selección de BD

### Criterios de Selección

| Criterio | PostgreSQL | MySQL | MongoDB |
|:---------|:-----------|:------|:--------|
| **ACID compliance** | ✅ Completo | ✅ Completo | ⚠️ Limitado |
| **Escalabilidad vertical** | ✅ Excelente | ✅ Buena | ✅ Excelente |
| **Escalabilidad horizontal** | ⚠️ Limitado | ⚠️ Limitado | ✅ Nativo |
| **JSON support** | ✅ JSONB | ⚠️ Básico | ✅ Nativo |
| **Costo** | ✅ Gratis | ✅ Gratis | ✅ Gratis |
| **Comunidad** | ✅ Grande | ✅ Grande | ✅ Grande |

### Recomendaciones por Tipo de Proyecto

| Tipo de Proyecto | BD Recomendada | Razón |
|:-----------------|:---------------|:------|
| E-commerce | PostgreSQL | Transacciones ACID |
| Chat/Real-time | MongoDB | Flexibilidad, escalabilidad |
| Dashboard analítico | PostgreSQL | Queries complejas |
| CRUD básico | MySQL | Simplicidad |
| API documentada | PostgreSQL | Estándares SQL |

---

## Buenas Prácticas

### Diseño de Esquemas

- [x] Normalización hasta 3FN
- [x] Índices en columnas de búsqueda
- [x] Constraints para integridad referencial
- [x] Nombres descriptivos (snake_case)
- [ ] Documentación de esquemas

### Seguridad

- [x] Variables de entorno para credenciales
- [x] Consultas parametrizadas (ORM)
- [ ] Backup automatizado
- [ ] Auditoría de acceso

### Rendimiento

- [x] Índices en columnas de filtro
- [x] Queries optimizadas con JOINs
- [ ] Connection pooling
- [ ] Monitoreo de queries lentas

---

## Herramientas de BD

| Herramienta | Uso | Nivel |
|:------------|:----|:------|
| pgAdmin | Administración PostgreSQL | ⭐⭐ |
| MySQL Workbench | Administración MySQL | ⭐⭐ |
| MongoDB Compass | Administración MongoDB | ⭐ |
| DBeaver | Cliente universal BD | ⭐⭐ |

---

**Última actualización:** *2026-09-06*
**Responsable:** *Victor Rafael Arévalo Sierra*
