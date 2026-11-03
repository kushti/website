---
cmsId: 2796
title: "Sigma 6.0: Un Ergo Más Inteligente y Flexible"
slug: Sigma-6-0-A-Smarter-More-Flexible-Ergo
type: blog
locale: es
date: "2025-07-23T12:40:00"
publishedAt: "2025-07-23T12:44:54.738"
updatedAt: "2025-08-25T19:04:13.756"
author: Ergo Platform
tags: ["Core","Explainers","Tooling"]
spotlight: false
subtitle: null
image: {"url":"/uploads/sigma6_be7ed67853.png","alt":"sigma6.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_sigma6_be7ed67853.png","hash":"large_sigma6_be7ed67853","mime":"image/png","name":"large_sigma6.png","path":null,"size":673.43,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_sigma6_be7ed67853.png","hash":"small_sigma6_be7ed67853","mime":"image/png","name":"small_sigma6.png","path":null,"size":185.9,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_sigma6_be7ed67853.png","hash":"medium_sigma6_be7ed67853","mime":"image/png","name":"medium_sigma6.png","path":null,"size":394.85,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_sigma6_be7ed67853.png","hash":"thumbnail_sigma6_be7ed67853","mime":"image/png","name":"thumbnail_sigma6.png","path":null,"size":50.56,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

**Sigma 6.0** es una importante actualización propuesta para la blockchain de Ergo. Proporciona a los desarrolladores herramientas más poderosas para construir contratos inteligentes, soluciona limitaciones de larga data y prepara la red para futuras mejoras, todo sin romper la compatibilidad con contratos o nodos existentes.

La actualización se está llevando a cabo a través de un soft-fork, lo que significa que los nodos no mineros existentes pueden seguir operando, mientras que los nodos mineros actualizados deben activar y hacer cumplir las nuevas características.

La votación por parte de los mineros ya está en marcha, con un apoyo actual de más del 90%, y una devnet está activa para pruebas tempranas. Si esto continúa, Sigma 6.0 se activará a finales de septiembre de 2025.


---

## ¿Por qué se necesita Sigma 6.0?

Desde que Ergo se lanzó en 2019, su lenguaje de contratos inteligentes (ErgoTree) se ha mantenido estable. Esa estabilidad ha ayudado a que la red se mantenga segura, pero también ha dificultado que los desarrolladores agreguen nuevas características o simplifiquen su lógica. Algunas mejoras se planearon desde los días de testnet en 2018, pero nunca llegaron a mainnet, hasta ahora.

Sigma 6.0 trae esas actualizaciones. Expande lo que es posible en un contrato, elimina limitaciones técnicas y despeja el camino para futuras mejoras de gobernanza y escalabilidad.

---

## ¿Qué está cambiando?

* **Números más poderosos** con un nuevo tipo de entero sin signo de 256 bits para operaciones criptográficas y financieras
* **Mejor manejo de datos** a través del soporte completo para serializar y deserializar tipos complejos en contratos
* **Transacciones más inteligentes** que pueden acceder a variables de contexto de otras entradas para una lógica más coordinada
* **Nuevas herramientas matemáticas y de listas** que incluyen operaciones a nivel de bits, desplazamiento y métodos de colección mejorados como `.get` y `.startsWith`
* **Validación PoW incorporada** para que los contratos puedan verificar encabezados de bloques o mensajes personalizados contra Autolykos2
* **Gobernanza actualizable** que permite a la red votar sobre nuevos parámetros a través de futuros soft-forks, comenzando con soporte para sub-bloques



---

## Cronograma de Activación

Sigma 6.0 está pasando por un proceso de activación de soft-fork que requiere dos fases: un período de votación y un período de actualización. Cada uno dura aproximadamente 45 días, haciendo que el despliegue completo tome alrededor de 90 días.

Los mineros comenzaron a votar a principios de julio de 2025, y el apoyo ya supera el umbral requerido del 90%. Si ese nivel de apoyo se mantiene, la actualización se activará a finales de septiembre de 2025.

Incluso si se alcanza el consenso temprano, el protocolo aún espera los períodos completos de votación y actualización antes de entrar en funcionamiento.

Una devnet ya está activa para Sigma 6.0, y los desarrolladores pueden encontrar información sobre cómo unirse en el chat de desarrollo comunitario. En julio, comenzó la prueba de nodos mineros que soportan sub-bloques en testnet. Después de eso, el enfoque se trasladará a refinar la documentación y mejorar el razonamiento formal sobre la seguridad durante agosto, asegurando que la actualización siga siendo impulsada por la investigación. Una vez completado, la atención puede dirigirse hacia un posible despliegue en mainnet.

---

## Para Desarrolladores

Las nuevas características requieren ErgoTree versión 3 o superior. Algunos tipos, como `Option`, `Header` y `UnsignedBigInt`, no pueden almacenarse directamente en registros o extensiones de contexto, pero pueden almacenarse como datos de bytes y restaurarse dentro del contrato.

El uso de ejemplo se puede encontrar en la [suite de pruebas de Sigma en GitHub](https://github.com/ergoplatform/sigmastate-interpreter/blob/b754e143cf38ed86d95698ede744a470dfa053d6/sigmastate/src/test/scala/special/sigma/SigmaDslSpecification.scala#L10040).

---

## Por qué es importante

Sigma 6.0 es la mayor actualización de la capa de contratos inteligentes de Ergo desde que se lanzó la red. Proporciona a los desarrolladores más libertad, desbloquea casos de uso completamente nuevos y fortalece las bases del protocolo, mientras se mantiene completamente compatible hacia atrás.

Con el apoyo de los mineros ahora por encima del 90%, la actualización está en camino de activarse este septiembre. Sigma 6.0 coloca a Ergo en una posición más fuerte para el futuro.


## Recursos

- Propuesta técnica completa: [EIP-0050: Sigma 6.0 en GitHub](https://github.com/ergoplatform/eips/blob/6102112617fff96fe88013858c307c2cf363babf/eip-0050.md)
- [Propuesta de Soft-Fork 6.0 (ergoforum)](https://www.ergoforum.org/t/6-0-soft-fork-proposal/5005)
- [Resumen de Documentación de Sigma 6.0](https://docs.ergoplatform.com/dev/protocol/sigma-6/)
