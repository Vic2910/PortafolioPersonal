# Ley de Propiedad Intelectual (El Salvador)

**Identificación:** Decreto Legislativo N.° 66
**Aprobación:** 8 de agosto de 2024
**Publicación:** Diario Oficial N.° 444 (tomo correspondiente a agosto de 2024)
**Vigencia:** aproximadamente seis meses después de su aprobación, entrando en vigor en **febrero de 2025**
**Norma derogada:** sustituye a la anterior Ley de Fomento y Protección de la Propiedad Intelectual (Decreto N.° 604, de 1993) y su reglamento (Decreto N.° 35, de 1994), unificando en un solo cuerpo normativo lo que antes estaba disperso.
**Institución creada:** Instituto de Propiedad Intelectual (registro único y electrónico), que reemplaza al antiguo Departamento de Propiedad Intelectual del Centro Nacional de Registros.
**Aplicación en el marco SDD:** rige la titularidad del código fuente, diseños de interfaz, contenidos y marca personal del desarrollador, así como los términos bajo los cuales puede licenciarse el software del portafolio (licencias de código abierto, cesión a clientes, atribución de recursos de terceros).

## 1. Objeto (Art. 1)

Establecer un marco legal único para la protección y observancia de los derechos de Propiedad Intelectual y otros derechos y privilegios industriales, así como para la protección de la innovación y la creatividad, facilitando la difusión de información, conocimiento, tecnología, cultura y artes, en cumplimiento de los compromisos internacionales asumidos por El Salvador ante la Organización Mundial de la Propiedad Intelectual (OMPI), la Organización Mundial del Comercio (OMC) y acuerdos comerciales como el CAFTA-DR.

## 2. Estructura: dos grandes ramas protegidas

| Rama | Objetos protegidos |
| :---- | :---- |
| **Propiedad Industrial** | Marcas, nombres comerciales, expresiones o señales de publicidad comercial, patentes de invención, modelos de utilidad, diseños industriales. |
| **Derecho de Autor y derechos conexos** | Obras literarias y artísticas, **programas de ordenador (software)**, videojuegos, obras musicales, dramáticas, coreográficas, cinematográficas y audiovisuales, obras de dibujo, pintura, arquitectura, escultura, fotografías, ilustraciones, mapas, planos y obras científicas; incluye también traducciones, adaptaciones y arreglos de obras. |

## 3. Protección del software como obra literaria

Los **programas de ordenador** están expresamente protegidos como obras del derecho de autor. Esto implica que:

- La protección **nace automáticamente con la creación** de la obra (el código fuente), sin necesidad de registro, siempre que exista originalidad (carácter de creación intelectual o personal).
- El registro ante el Instituto de Propiedad Intelectual es **declarativo, no constitutivo**, pero otorga un valor probatorio reforzado en caso de disputa sobre autoría o fecha de creación.
- La protección alcanza el código fuente, el código objeto y la documentación técnica asociada (no las ideas, algoritmos o funcionalidades en abstracto, que quedan fuera del ámbito del derecho de autor y podrían, en su caso, protegerse por otras vías como el secreto empresarial o, excepcionalmente, patentes de proceso).

## 4. Derechos morales y patrimoniales

- **Derechos morales**: irrenunciables e inalienables; incluyen el derecho de paternidad (a ser reconocido como autor) y el derecho de integridad (a oponerse a modificaciones que perjudiquen su reputación). No pueden cederse ni siquiera por contrato.
- **Derechos patrimoniales**: incluyen la reproducción, distribución, comunicación pública y transformación de la obra; **sí pueden cederse, licenciarse o transferirse** mediante contrato (incluyendo licencias de código abierto como MIT, Apache 2.0 o GPL).

## 5. Presunción de cesión de derechos patrimoniales al empleador (novedad de la reforma de 2024)

Una de las novedades más relevantes para el ejercicio profesional del desarrollador de software es la **presunción de cesión de derechos patrimoniales al empleador** en obras creadas bajo contrato de trabajo o en el ejercicio de una función pública, **salvo prueba en contrario**. Esto significa que, salvo pacto expreso distinto:

- El código desarrollado por un empleado en el marco de su relación laboral pertenece patrimonialmente al empleador.
- Un desarrollador independiente (freelance) que trabaje bajo un contrato de prestación de servicios debe **pactar expresamente** en el contrato la titularidad y el alcance de la cesión de derechos patrimoniales sobre el código entregado al cliente, para evitar ambigüedades sobre si aplica o no la presunción legal.

## 6. Medidas tecnológicas de protección (DRM)

La ley reconoce y protege las **medidas tecnológicas efectivas**, entendidas como cualquier tecnología, dispositivo o componente que, en el curso normal de su operación, controla el acceso a una obra o protege un derecho conexo (por ejemplo, mecanismos de licenciamiento por clave, ofuscación de código con fines de protección, o control de acceso a repositorios privados).

## 7. Protección extraterritorial y reciprocidad

El extranjero que publique una obra en El Salvador goza de los mismos derechos que los nacionales. Las obras publicadas en el extranjero gozan de protección en territorio salvadoreño conforme a los tratados y convenios internacionales ratificados; en los demás casos, se exige el requisito de reciprocidad.

## 8. Duración de la protección

Conforme a los compromisos internacionales asumidos por El Salvador (incluido el CAFTA-DR), el plazo general de protección del derecho de autor se extiende durante la vida del autor más un período posterior (la tendencia regional post-CAFTA-DR es de 70 años tras el fallecimiento del autor). Para la fecha exacta aplicable a una obra específica, debe verificarse el texto vigente y sus disposiciones transitorias.

## 9. Infracciones y observancia

El Instituto de Propiedad Intelectual supervisa el uso de obras protegidas, fomenta la difusión y formación sobre derechos intelectuales, y da aviso a la Fiscalía General de la República en caso de infracciones. La ley contempla, además, **centros de mediación** para la resolución de conflictos sobre derechos de autor y pago de regalías.

## 10. Aplicación práctica al portafolio de software (guía para el agente de IA)

1. Incluir en cada repositorio público un archivo **`LICENSE`** explícito (MIT, Apache 2.0, GPL, etc.) que declare bajo qué términos se cede el uso de los derechos patrimoniales del código; en ausencia de licencia, el código permanece protegido por defecto ("todos los derechos reservados"), lo cual puede no ser la intención del autor.
2. Declarar en el `README.md` el aviso de copyright (`© [año] [nombre del autor]`) y, cuando aplique, atribuir correctamente los recursos de terceros utilizados (fuentes tipográficas, iconos, imágenes, librerías) respetando sus propias licencias.
3. Cuando el portafolio documente proyectos realizados para clientes o empleadores, verificar que el desarrollador tenga **autorización expresa** para exhibir capturas de pantalla, código o datos del proyecto (por defecto, si no hubo pacto expreso en contrario, los derechos patrimoniales del trabajo por encargo o bajo relación laboral pertenecen al cliente/empleador, conforme a la presunción legal de cesión).
4. No incorporar en el portafolio código, diseños o contenidos de terceros sin la debida licencia o autorización (por ejemplo, plantillas comerciales, imágenes de bancos de pago no licenciadas, o fragmentos de código con licencias restrictivas incompatibles con el uso previsto).
5. Si el desarrollador ofrece contratos de prestación de servicios desde el propio portafolio, incluir una cláusula clara sobre la **titularidad y cesión de derechos patrimoniales** del código entregado al cliente, para no depender únicamente de la presunción legal supletoria.
