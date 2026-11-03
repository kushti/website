---
cmsId: 2792
title: "Ergo Infrastructure DAO: Descentralizando la columna vertebral del ecosistema Ergo"
slug: Ergo-Infrastructure-DAO-Decentralizing-the-Backbone-of-the-Ergo-Ecosystem
type: blog
locale: es
date: "2025-08-13T08:00:00"
publishedAt: "2025-08-13T11:52:43.574"
updatedAt: "2025-08-25T19:03:29.713"
author: Ergo Platform
tags: ["DAOs"]
spotlight: false
subtitle: null
image: {"url":"/uploads/dao_4bb9b2ff23.png","alt":"dao.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_dao_4bb9b2ff23.png","hash":"large_dao_4bb9b2ff23","mime":"image/png","name":"large_dao.png","path":null,"size":685.89,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_dao_4bb9b2ff23.png","hash":"small_dao_4bb9b2ff23","mime":"image/png","name":"small_dao.png","path":null,"size":194.19,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_dao_4bb9b2ff23.png","hash":"medium_dao_4bb9b2ff23","mime":"image/png","name":"medium_dao.png","path":null,"size":405.28,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_dao_4bb9b2ff23.png","hash":"thumbnail_dao_4bb9b2ff23","mime":"image/png","name":"thumbnail_dao.png","path":null,"size":55.51,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

La misión de Ergo siempre ha estado arraigada en la descentralización, no solo en la capa de consenso, sino en toda la pila. Con el lanzamiento de la **Ergo Infrastructure DAO (InfraDAO)**, esa visión se está expandiendo hacia los servicios e infraestructura que alimentan el ecosistema todos los días.

La InfraDAO ya está oficialmente activa en [Paideia](https://app.paideia.im/ergoinfradao), tras una exitosa votación de gobernanza. Lo que comenzó como una propuesta de base dentro del **grupo de contribuyentes Sigmanauts**—liderada por el Sigmanaut favorito de todos, **qx**, conocido por sus apariciones en las AMAs de Ergo y en todas partes del ecosistema—se ha convertido ahora en una iniciativa de propiedad comunitaria que transformará la forma en que se entregan y mantienen los servicios centrales.

---

## ¿Qué es la Ergo Infrastructure DAO?

La InfraDAO es una red descentralizada y operada por pares de proveedores de infraestructura responsables de mantener servicios clave en el ecosistema Ergo. Esto incluye:

* Nodos completos y APIs
* Exploradores de blockchain
* Infraestructura de testnet y minería
* Documentación comunitaria y espejos
* Herramientas como SigmaSpace, ErgoDocs y Sigmaverse
* Futuro alojamiento y gestión de ergoplatform.org

Esta DAO reducirá la dependencia de la Fundación Ergo y asegurará que la infraestructura sea resistente a la censura, tolerante a fallos y gobernada de manera transparente.

---

## Por qué es importante

Hasta ahora, gran parte de la infraestructura de Ergo, incluidos los puntos finales públicos, exploradores de bloques y documentación alojada, ha sido mantenida por la **Fundación Ergo** y más tarde por la **Developer DAO**. Si bien este modelo proporcionó estabilidad y fiabilidad inicial, también creó puntos de dependencia centralizados.

La InfraDAO cambia eso al distribuir responsabilidades a través de una red global autogestionada de contribuyentes que ejecutan y mantienen la pila. Asegura:

* Servicios más resilientes y geográficamente distribuidos
* Sostenibilidad a largo plazo sin dependencia de la Fundación
* Control comunitario sobre la gobernanza y el despliegue
* Un modelo operativo verdaderamente descentralizado que coincide con los principios fundamentales de Ergo

---

## Lo que ya está activo y migrado

La InfraDAO ya ha hecho progresos. Tres máquinas de alto rendimiento, balanceadas en carga a través de múltiples puntos finales, están ahora activas y sincronizadas utilizando el backend de almacenamiento más rápido **RocksDB**:

* [explorer-p2p.ergoplatform.com](https://explorer-p2p.ergoplatform.com)
* [graphql-p2p.ergoplatform.com](https://graphql-p2p.ergoplatform.com)
* [api-p2p.ergoplatform.com](https://api-p2p.ergoplatform.com)
* [node-p2p.ergoplatform.com](https://node-p2p.ergoplatform.com/panel) (compatible con HTTPS para billeteras)

Estos puntos finales son **totalmente compatibles con billeteras móviles y basadas en navegador** y sirven como base para el acceso descentralizado a la red Ergo.

Puedes monitorear el tiempo de actividad y la disponibilidad de pares a través del panel público:
[Ergo Infrastructure DAO – Panel de Estado en Tiempo Real](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## P2P, Balanceo de Carga y Operadores Comunitarios

Mientras que “P2P” aquí se refiere de manera amplia a una red distribuida, la infraestructura es realmente gestionada por la comunidad. El balanceo de carga inicial incluirá máquinas operadas por:

* qx (tres nodos)
* Jumei
* 2ndTL Mining
* Sheetoshi

Estas están desplegadas estratégicamente para apoyar el balanceo de carga basado en geolocalización global. Se agregarán más máquinas comunitarias a medida que la DAO se expanda, formando una columna vertebral completamente descentralizada y globalmente resiliente.

El proceso de selección para nuevos participantes involucrará:

1. Una **dirección IP estática**
2. **Ancho de banda de carga suficiente**
3. Un **entendimiento básico de infraestructura** (o la capacidad de seguir instrucciones de configuración de línea de comandos)
4. Una **dirección de envío** para enviar un nodo o explorador preconfigurado (proporcionado sin cargo)

---

## De la idea a la ejecución: Construido por la comunidad

La InfraDAO comenzó como una iniciativa interna entre los Sigmanauts. Reconociendo la necesidad de descentralizar la infraestructura, **qx** propuso la creación de una DAO y lideró su implementación.

En julio de 2025, una propuesta solicitando **50,000 \$PAIDEIA** fue aprobada con éxito en Paideia. Estos fondos están cubriendo costos iniciales como la preparación de máquinas, envío y la incorporación de contribuyentes. El token de la DAO ya está activo, y la gobernanza está en funcionamiento.

---

## Requisitos técnicos

**Requisitos de hardware y red:**
* Ancho de banda de carga: 50 Mbps o más
* Latencia: \~100ms o menos a tu región local
* IPv4: IP estática o dinámica a largo plazo
* Especificaciones de la máquina:
  * Ubuntu OS
  * 16GB de RAM (32GB recomendado)
  * 1TB SSD
  * Docker, tmux, acceso SSH y habilidades de edición de configuración

Estos sistemas están optimizados para alta disponibilidad y actualmente están sirviendo tráfico de producción a través de puntos finales balanceados.

---

## No solo alojamiento: Expansión futura

Mientras que la primera fase de InfraDAO se centra en el alojamiento, crecerá para apoyar:

* Mantenimiento y monitoreo de infraestructura
* Actualizaciones de dependencia y seguridad
* Orquestación de Docker y despliegue de software
* Gestión de CMS para ergoplatform.org
* Publicación y actualizaciones de documentación
* Servicios de alojamiento como SigmaSpace, ErgoDocs y Sigmaverse

Esto abre la participación a administradores de sistemas, desarrolladores backend, mantenedores de contenido y otros contribuyentes más allá de los operadores de nodos.

---

## Estado actual

* DAO activa en Paideia
* Propuesta de financiación inicial aprobada
* Token acuñado y votación activa
* Primera ola de infraestructura activa y operativa
* Panel de monitoreo público en línea
* Próximo: contribuyentes adicionales y expansión global

---

## Cómo involucrarse

Si tienes habilidades técnicas y deseas ejecutar infraestructura, mantener el tiempo de actividad, actualizar sitios o participar en la gobernanza de la DAO, ahora es el momento de intervenir.

→ Únete a la DAO o sigue las propuestas aquí:
[https://app.paideia.im/ergoinfradao](https://app.paideia.im/ergoinfradao)

→ Monitorea el estado de la infraestructura:
[https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## Reflexiones finales

El lanzamiento de la Ergo Infrastructure DAO es un gran paso hacia la descentralización de pila completa, la autonomía, el control comunitario y la sostenibilidad de un ecosistema de blockchain impulsado por una misión.

Con la gobernanza en cadena, infraestructura propiedad de la comunidad y contribuyentes globales ya ejecutando servicios críticos, Ergo está mostrando cómo se ve la verdadera descentralización.

Ayuda a construir la base. Involúcrate.
