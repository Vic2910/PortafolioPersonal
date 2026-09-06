# Semantic Versioning (SemVer) — Especificación de Versionado Semántico

**Origen:** especificación pública mantenida como estándar de facto en el ecosistema de gestión de paquetes de software (npm, Cargo, entre otros gestores la adoptan como convención por defecto).
**Versión de referencia:** SemVer 2.0.0
**Aplicación en el marco SDD:** convención obligatoria de versionado para cualquier paquete, librería o componente reutilizable que el portafolio publique (por ejemplo, un componente de UI de código abierto derivado de un proyecto destacado), y práctica recomendada para el propio código del sitio si se etiquetan releases.

## 1. Formato del número de versión

```
MAYOR.MENOR.PARCHE  (MAJOR.MINOR.PATCH)
```

Cada uno de los tres componentes es un entero no negativo que se incrementa numéricamente (nunca mediante ceros a la izquierda) según la naturaleza del cambio introducido.

## 2. Reglas de incremento

| Componente | Se incrementa cuando... | Ejemplo |
| :---- | :---- | :---- |
| **MAYOR (MAJOR)** | Se realizan cambios incompatibles con la API pública existente (*breaking changes*). | `2.4.1 → 3.0.0` |
| **MENOR (MINOR)** | Se añade funcionalidad de forma retrocompatible con versiones anteriores. | `2.4.1 → 2.5.0` |
| **PARCHE (PATCH)** | Se corrigen errores de forma retrocompatible, sin añadir funcionalidad nueva. | `2.4.1 → 2.4.2` |

Al incrementar el componente MAYOR, los componentes MENOR y PARCHE deben restablecerse a cero; al incrementar MENOR, el componente PARCHE debe restablecerse a cero.

## 3. Versión inicial de desarrollo (0.y.z)

Mientras la versión principal sea `0` (por ejemplo, `0.3.2`), la API se considera **inestable** y puede cambiar en cualquier momento sin previo aviso formal; la versión `1.0.0` marca convencionalmente el momento en que la API se define como pública y estable.

## 4. Metadatos adicionales

- **Versiones de pre-lanzamiento**: se indican añadiendo un guion y una serie de identificadores separados por puntos inmediatamente después del componente PARCHE (por ejemplo, `1.0.0-alpha`, `1.0.0-rc.1`); tienen menor precedencia que la versión normal asociada.
- **Metadatos de compilación**: se indican añadiendo un signo `+` y una serie de identificadores (por ejemplo, `1.0.0+20250115`); se ignoran al comparar precedencia entre versiones.

## 5. Relación con Conventional Commits

Ambas especificaciones son complementarias por diseño: los tipos de commit `feat`, `fix` y los indicadores de *breaking change* de Conventional Commits se corresponden de forma directa y automatizable con los incrementos MENOR, PARCHE y MAYOR de SemVer respectivamente, permitiendo automatizar por completo el cálculo de la siguiente versión del proyecto a partir del historial de control de versiones.

## 6. Aplicación práctica al portafolio de software (guía para el agente de IA)

1. Si un proyecto del portafolio se publica como paquete reutilizable (por ejemplo, en el registro npm), etiquetar cada release siguiendo estrictamente SemVer, evidenciando en el `CHANGELOG.md` la correspondencia entre cada incremento de versión y los cambios que lo motivaron.
2. Evitar publicar cambios incompatibles bajo un incremento MENOR o PARCHE, incluso cuando el cambio parezca menor en términos de líneas de código modificadas; la incompatibilidad de la API pública, no el volumen del cambio, es el criterio determinante.
3. Mantener la versión `0.y.z` mientras el proyecto se considere experimental o en validación activa, y reservar el salto a `1.0.0` para el momento en que se comprometa formalmente la estabilidad de la API expuesta (por ejemplo, de un componente de UI publicado como parte de un caso de estudio del portafolio).
