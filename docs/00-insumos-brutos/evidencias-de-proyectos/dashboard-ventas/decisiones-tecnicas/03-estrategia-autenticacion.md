# Decisión: Estrategia de Autenticación

## Contexto

El Dashboard de Ventas requiere un sistema de autenticación que:
- Permita a los usuarios registrarse e iniciar sesión
- Distinga entre roles (admin, vendedor, cliente)
- Proteja endpoints sensibles (CRUD de productos, reportes)
- Funcione con arquitectura stateless (API REST)
- Sea seguro y estandarizado

Se necesita seleccionar el mecanismo de autenticación más adecuado para una aplicación web moderna con frontend separado.

---

## Opciones Evaluadas

### Opción 1: Sesiones HTTP (Server-Side Sessions)

**Pros:**
- Modelo simple y bien understood
- Control centralizado del estado de sesión
- Fácil invalidación de sesiones
- Menor exposición a ataques de token theft

**Contras:**
- Requiere almacenamiento en servidor (memoria, Redis, BD)
- Problemas de escalabilidad horizontal
- No funciona bien con arquitectura stateless
- Complejidad en despliegues con múltiples servidores

### Opción 2: JWT (JSON Web Tokens)

**Pros:**
- Totalmente stateless (sin estado en servidor)
- Escalable horizontalmente
- Estándar ampliamente adoptado
- Funciona bien con微servicios
- Compatible con múltiples clientes (web, móvil)

**Contras:**
- Tokens más grandes que session IDs
- Difícil invalidar antes de expiración
- Riesgo de información sensible en payload
- Requiere manejo seguro de refresh tokens

### Opción 3: OAuth 2.0 / OpenID Connect

**Pros:**
- Estándar para autorización delegada
- Permite login con proveedores externos (Google, GitHub)
- Separación clara entre autenticación y autorización
- Soporte para múltiples flujos (Authorization Code, PKCE)

**Contras:**
- Complejidad significativa de implementación
- Requiere dependencias externas (proveedores de identidad)
- Overhead para aplicaciones simples
- Curva de aprendizaje pronunciada

---

## Decisión Tomada

**Opción seleccionada: JWT (JSON Web Tokens) con Refresh Tokens**

### Justificación

1. **Arquitectura stateless:** El frontend y backend están separados. JWT permite que el servidor no mantenga estado, facilitando escalabilidad.

2. **Compatibilidad con Spring Boot:** Spring Security tiene soporte nativo y maduro para JWT con múltiples bibliotecas disponibles (jjwt, nimbus-jose-jwt).

3. **Estándar de la industria:** JWT es ampliamente utilizado en APIs REST modernas, lo que facilita la transferibilidad de conocimientos.

4. **Soporte multi-cliente:** Un mismo token puede servir para web, móvil u otros clientes.

5. **Balance seguridad/complexity:** Ofrece buena seguridad sin la complejidad completa de OAuth 2.0.

---

## Arquitectura de Autenticación

### Flujo de Login

```
┌──────────┐      ┌──────────┐      ┌──────────┐
│ Frontend │      │ Backend  │      │ Database │
└────┬─────┘      └────┬─────┘      └────┬─────┘
     │                  │                  │
     │  POST /auth/login │                  │
     │  {email, password}│                  │
     │─────────────────>│                  │
     │                  │  SELECT user      │
     │                  │─────────────────>│
     │                  │  User data        │
     │                  │<─────────────────│
     │                  │                  │
     │                  │  Validate password│
     │                  │  Generate JWT     │
     │                  │  Generate Refresh │
     │                  │                  │
     │  {accessToken,   │                  │
     │   refreshToken}  │                  │
     │<─────────────────│                  │
     │                  │                  │
     │  Store tokens    │                  │
     │  (httpOnly cookie│                  │
     │   or localStorage)                  │
     │                  │                  │
```

### Flujo de Request Autenticado

```
┌──────────┐      ┌──────────┐
│ Frontend │      │ Backend  │
└────┬─────┘      └────┬─────┘
     │                  │
     │  GET /api/data   │
     │  Authorization:  │
     │  Bearer <JWT>    │
     │─────────────────>│
     │                  │
     │                  │  Validate JWT
     │                  │  Check expiration
     │                  │  Extract user info
     │                  │  Check permissions
     │                  │
     │  Response (200)  │
     │<─────────────────│
     │                  │
```

### Flujo de Refresh Token

```
┌──────────┐      ┌──────────┐
│ Frontend │      │ Backend  │
└────┬─────┘      └────┬─────┘
     │                  │
     │  POST /auth/refresh │
     │  {refreshToken}     │
     │─────────────────>│
     │                  │
     │                  │  Validate refresh token
     │                  │  Check if revoked
     │                  │  Generate new JWT
     │                  │
     │  {accessToken}   │
     │<─────────────────│
     │                  │
```

---

## Estructura de Tokens

### JWT Access Token

```json
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user-uuid-1234",
    "email": "usuario@ejemplo.com",
    "role": "ADMIN",
    "iat": 1700000000,
    "exp": 1700003600
  }
}
```

### Refresh Token

- **Formato:** Token opaco (no JWT) almacenado en base de datos
- **Expiración:** 7 días
- **Almacenamiento:** Tabla `refresh_tokens` con metadatos
- **Revocación:** Soporte para invalidación individual

---

## Implementación en Spring Boot

### Dependencias Principales

```xml
<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>

<!-- Spring Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

### Configuración de Seguridad

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, 
                UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }
}
```

### Generación de Tokens

```java
@Service
public class TokenService {
    
    @Value("${jwt.secret}")
    private String secretKey;
    
    @Value("${jwt.expiration}")
    private long expiration;
    
    public String generateAccessToken(UserDetails userDetails) {
        return Jwts.builder()
            .subject(userDetails.getUsername())
            .claim("role", userDetails.getAuthorities())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSigningKey())
            .compact();
    }
}
```

---

## Medidas de Seguridad

### 1. Almacenamiento de Tokens

| Método | Seguridad | Recomendación |
|:-------|:----------|:--------------|
| localStorage | Baja | No recomendado para producción |
| sessionStorage | Media | Aceptable para desarrollo |
| httpOnly cookie | Alta | **Recomendado** |
|内存 (memory) | Alta | Para SPA con refresh automático |

**Decisión:** Usar httpOnly cookies para producción, localStorage para desarrollo.

### 2. Expiración de Tokens

| Token | Duración | Renovación |
|:------|:---------|:-----------|
| Access Token | 15 minutos | Automática con refresh |
| Refresh Token | 7 días | Re-login después de expiración |

### 3. Protección contra Ataques

- **RS256 (asíncrico):** Usar claves RSA para firmar tokens
- **Rate limiting:** Limitar intentos de login
- **HTTPS obligatorio:** Forzar transporte cifrado
- **CORS configurado:** Restringir orígenes permitidos
- **Revocación de refresh tokens:** Soporte para logout completo

---

## Consecuencias

### Positivas
- Arquitectura stateless y escalable
- Estándar ampliamente documentado
- Buen soporte en Spring Security
- Compatible con múltiples clientes

### Negativas
- Dificultad para invalidar tokens antes de expiración
- Tamaño mayor que session IDs
- Complejidad en manejo de refresh tokens

### Riesgos
- Robo de tokens (mitigado con HTTPS y httpOnly cookies)
- Tokens expirados (mitigado con refresh automático)
- Información sensible en payload (mitigado con claims mínimos)

---

## Referencias

- [Spring Security JWT Tutorial](https://spring.io/guides/gs/securing-web/)
- [JWT.io - Introduction](https://jwt.io/introduction/)
- [OWASP JWT Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

---

**Fecha de decisión:** *[Completar]*
**Tomada por:** *[Nombre del desarrollador]*
**Revisada por:** *[Si aplica]*
