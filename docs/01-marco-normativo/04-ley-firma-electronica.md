# Ley de Firma Electrónica (El Salvador)

**Identificación:** Decreto Legislativo N.° 133
**Aprobación:** 1 de octubre de 2015
**Publicación:** Diario Oficial N.° 196, Tomo N.° 409, del 26 de octubre de 2015
**Vigencia:** 180 días después de su publicación (aproximadamente abril de 2016)
**Reglamento de aplicación:** Decreto Ejecutivo N.° 60, que desarrolla la aplicación práctica de la ley
**Aplicación en el marco SDD:** relevante para funcionalidades del portafolio que involucren la suscripción electrónica de documentos, contratos de prestación de servicios, aceptación de términos y condiciones, o la firma de propuestas/cotizaciones enviadas a clientes.

## 1. Objeto

Brindar seguridad jurídica a los usuarios de las comunicaciones electrónicas y a las transacciones realizadas mediante aplicaciones tecnológicas o suscripción electrónica, equiparando la validez jurídica de la **firma electrónica simple** y la **firma electrónica certificada** con la de la **firma autógrafa** (manuscrita), en los términos y condiciones que la propia ley establece.

## 2. Tipos de firma y sus efectos jurídicos (Art. 6)

| Tipo de firma | Validez jurídica | Valor probatorio |
| :---- | :---- | :---- |
| **Firma electrónica simple** | Misma validez jurídica que la firma autógrafa. | No tiene el mismo valor probatorio reforzado que la firma certificada, pero puede constituir un indicio o elemento de prueba conforme a las reglas generales. |
| **Firma electrónica certificada** | Validez jurídica plena, equiparada a la firma autógrafa. | Genera presunciones legales específicas (Art. 25): salvo prueba en contrario, se presume que la firma no ha sido modificada desde el momento de su generación y que corresponde a su titular, siempre que se cumplan los requisitos técnicos exigidos por la ley. |

La firma electrónica certificada requiere un **certificado digital** emitido por un **Proveedor de Servicios de Certificación** debidamente acreditado conforme al reglamento de la ley.

## 3. Almacenamiento de documentos electrónicos (Art. 11-15)

- El almacenamiento de documentos electrónicos puede realizarse a través de **proveedores de almacenamiento de documentos electrónicos** o **por cuenta propia**.
- Cuando la ley o un acto jurídico exige que un documento se conserve por un período determinado, dicha exigencia se entiende cumplida si el documento se conserva a través de un proveedor de almacenamiento o, en caso de conservación propia, si se cumplen los requisitos mínimos técnicos establecidos en el Art. 13-A.
- Todo proveedor que preste el servicio de almacenamiento para terceros debe emitir una **Declaración de Prácticas y Políticas de Almacenamiento de Documentos Electrónicos**, detallando sus obligaciones respecto a la gestión, conservación e integridad de los documentos.
- Los documentos electrónicos "desmaterializados" pueden presentarse en su soporte físico original en caso de destrucción, ilegibilidad, alteración o pérdida de autenticidad/integridad del documento electrónico.

## 4. Régimen transitorio y obligaciones de los prestadores de servicios

Toda persona natural o jurídica que, al momento de entrar en vigencia la ley, ya prestara servicios de certificación o almacenamiento de documentos electrónicos, contó con un plazo de **un año** para adecuarse a los requerimientos de la nueva normativa. El tratamiento de datos personales que precisen los prestadores de servicios de certificación y de almacenamiento se sujeta, además, a la Ley para la Protección de Datos Personales.

## 5. Relación con el Reglamento de la Ley de Firma Electrónica

El Reglamento (Decreto N.° 60) desarrolla, entre otros aspectos, los requisitos técnicos de los certificados digitales, el procedimiento de acreditación de los proveedores de servicios de certificación, y las garantías mínimas que debe cumplir el sistema de almacenamiento electrónico (Art. 14 de la ley).

## 6. Aplicación práctica al portafolio de software (guía para el agente de IA)

1. Si el portafolio incluye un flujo de **aceptación de propuestas o contratos** (por ejemplo, un formulario de "solicitar cotización" seguido de un contrato digital), basta con una firma electrónica simple (checkbox de aceptación con registro de IP, fecha/hora y user-agent) para que el acto tenga validez jurídica; si se requiere valor probatorio reforzado, debe integrarse un proveedor de firma electrónica certificada acreditado.
2. Los documentos generados y almacenados electrónicamente (PDF de propuestas, contratos firmados, comprobantes) deben conservarse con **medidas de integridad verificables** (hash criptográfico, sello de tiempo) si se pretende invocar las presunciones legales de autenticidad.
3. No debe presentarse en el sitio una "firma digital" cosmética (por ejemplo, una imagen de firma escaneada sin ningún mecanismo de verificación) como si tuviera el valor probatorio reforzado que la ley reserva a la firma certificada; el agente de IA debe diferenciar claramente, en la interfaz y en la documentación, entre ambos niveles de firma.
4. Cuando se use un proveedor externo de firma electrónica o de gestión documental, verificar que dicho proveedor cumpla el rol de "encargado del tratamiento" conforme a la Ley para la Protección de Datos Personales.
