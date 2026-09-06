# Ley Especial contra los Delitos Informáticos y Conexos (El Salvador)

**Identificación:** Decreto Legislativo N.° 260
**Aprobación:** 4 de febrero de 2016
**Publicación:** Diario Oficial N.° 40, Tomo N.° 410, del 26 de febrero de 2016
**Vigencia:** ocho días después de su publicación (Art. 36), es decir, aproximadamente el 5 de marzo de 2016
**Reformas relevantes:** Decreto N.° 236 (publicado en el Diario Oficial el 12/01/2022, modifica artículos relativos a acceso indebido a sistemas) y Decreto N.° 332 (publicado el 25/06/2025, amplía definiciones del Art. 3 —incisos w, x, y, z— para incorporar conceptos como *metadatos*); en agosto de 2024 la Asamblea Legislativa reformó adicionalmente la ley para reforzar la protección frente a estafas, suplantación de identidad y acoso digital.
**Aplicación en el marco SDD:** define el límite penal de las pruebas de seguridad, el pentesting y el manejo de vulnerabilidades sobre el propio portafolio o sobre sistemas de terceros; también protege al desarrollador como víctima potencial de ataques a su propia infraestructura.

## 1. Objeto (Art. 1)

Proteger los bienes jurídicos frente a conductas delictivas cometidas por medio de las Tecnologías de la Información y la Comunicación (TIC), así como prevenir y sancionar los delitos cometidos en perjuicio de:

- Los datos almacenados, procesados o transferidos.
- Los sistemas informáticos, su infraestructura o cualquiera de sus componentes.
- Otros bienes jurídicos afectados mediante el uso de dichas tecnologías, como el patrimonio, la intimidad, la propia imagen, la identidad y la identidad sexual de las personas naturales o jurídicas.

## 2. Ámbito de aplicación (Art. 2)

La ley se aplica a los hechos punibles cometidos total o parcialmente en territorio salvadoreño o en lugares sometidos a su jurisdicción. Tiene además un **alcance extraterritorial**: se aplica a cualquier persona, nacional o extranjera, por delitos que afecten bienes jurídicos del Estado, de sus habitantes o protegidos por tratados internacionales ratificados por El Salvador, incluso cuando la ejecución del hecho se haya iniciado en el extranjero pero se haya consumado en territorio nacional, o cuando se hayan usado TIC instaladas en El Salvador y el responsable no haya sido juzgado en el extranjero.

## 3. Delitos tipificados más relevantes para el desarrollo de software

| Artículo | Conducta tipificada | Pena orientativa |
| :---- | :---- | :---- |
| **Art. 8** (reformado por Decreto 236/2022) | Acceso indebido a sistemas informáticos: acceder, interceptar o utilizar total o parcialmente, sin autorización o excediendo la concedida, un sistema informático que use TIC. | Prisión de 1 a 4 años. |
| **Art. 9** | Violación de la seguridad del sistema: transgredir sin autorización la seguridad de un sistema restringido o protegido por un mecanismo de seguridad específico; incluye inducir a un tercero a ejecutar involuntariamente un programa, mensaje o instrucción que viole medidas de seguridad. | Prisión de 3 a 6 años (agravada de 4 a 7 años si el sistema afectado presta servicios públicos, financieros, o involucra criptoactivos o información confidencial de terceros; atenuada de 1 a 3 años si el hecho se comete por imprudencia). |
| **Posesión y uso de equipos o prestación de servicios** para la vulneración de la seguridad informática | Sanciona la tenencia, distribución o comercialización de herramientas (exploits, malware, contraseñas o códigos de acceso obtenidos ilícitamente) destinadas a comprometer sistemas informáticos. | Conforme a la escala penal del capítulo correspondiente. |
| **Daño o sabotaje informático** | Conductas que afectan la disponibilidad o integridad de datos, sistemas o infraestructura informática (destrucción, alteración, supresión de datos o programas). | Conforme a la escala penal del capítulo correspondiente. |
| **Delitos contra la intimidad, identidad e imagen mediante TIC** | Interceptación ilegítima de comunicaciones, suplantación de identidad digital, difusión no consentida de contenido íntimo, acoso u hostigamiento mediante medios informáticos. | Conforme a la escala penal del capítulo correspondiente y a las reformas de 2024-2025. |

> **Nota metodológica:** para la aplicación exacta de penas y elementos típicos de los delitos distintos a los Art. 8 y 9 (verificados directamente contra el texto legal), se recomienda contrastar el articulado vigente y sus reformas antes de fundamentar cualquier asesoría legal puntual; este documento resume el objeto y alcance normativo con fines de referencia técnica para el equipo de desarrollo, no constituye asesoría jurídica.

## 4. Causa de justificación: pruebas técnicas y auditorías autorizadas

La propia ley reconoce que **no incurre en sanción** quien ejecute las conductas descritas en los Art. 8 y 9 inciso primero cuando actúe **con autorización expresa de la persona facultada**, con el objeto de conducir pruebas técnicas o auditorías de seguridad. Esta disposición es la base legal que legitima:

- Los programas de *bug bounty* y *responsible disclosure*.
- Las pruebas de penetración (pentesting) contratadas formalmente.
- Las auditorías de seguridad internas sobre los propios sistemas del desarrollador.

## 5. Aplicación práctica al portafolio de software (guía para el agente de IA)

1. Cualquier prueba de seguridad automatizada (escaneo de vulnerabilidades, fuzzing, pruebas de carga agresivas) que el agente de IA ejecute debe limitarse a **sistemas propios o expresamente autorizados** por su titular; nunca debe generarse código dirigido a acceder, interceptar o comprometer sistemas de terceros sin autorización documentada.
2. Si el portafolio incorpora un formulario de contacto, backend propio o panel de administración, deben implementarse controles de acceso robustos (ver `owasp-top-10.md` y `owasp-asvs.md`) para reducir la superficie de exposición frente a los delitos de acceso indebido y violación de seguridad del sistema descritos en los Art. 8 y 9.
3. Documentar en el repositorio, cuando exista un mecanismo de reporte de vulnerabilidades (`SECURITY.md`), que cualquier prueba de seguridad de terceros debe contar con autorización previa, alineando el proyecto con la causa de justificación reconocida por la ley.
4. Evitar la implementación de mecanismos técnicos que puedan interpretarse como "posesión o uso de herramientas para vulnerar la seguridad" de terceros (por ejemplo, scripts de scraping agresivo o bypass de mecanismos de autenticación ajenos) dentro del propio código del portafolio.
