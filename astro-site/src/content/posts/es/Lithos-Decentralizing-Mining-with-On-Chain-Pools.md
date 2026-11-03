---
cmsId: 2797
title: "Lithos: Descentralizando la Minería con Pools On-Chain"
slug: Lithos-Decentralizing-Mining-with-On-Chain-Pools
type: blog
locale: es
date: "2025-07-24T14:20:00"
publishedAt: "2025-07-24T14:21:09.732"
updatedAt: "2025-08-25T19:04:16.713"
author: Ergo Platform
tags: ["Ecosystem","Mining"]
spotlight: false
subtitle: null
image: {"url":"/uploads/lithos_3a4c5e9c7b.png","alt":"lithos.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_lithos_3a4c5e9c7b.png","hash":"large_lithos_3a4c5e9c7b","mime":"image/png","name":"large_lithos.png","path":null,"size":380.96,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_lithos_3a4c5e9c7b.png","hash":"small_lithos_3a4c5e9c7b","mime":"image/png","name":"small_lithos.png","path":null,"size":114.45,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_lithos_3a4c5e9c7b.png","hash":"medium_lithos_3a4c5e9c7b","mime":"image/png","name":"medium_lithos.png","path":null,"size":229.61,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_lithos_3a4c5e9c7b.png","hash":"thumbnail_lithos_3a4c5e9c7b","mime":"image/png","name":"thumbnail_lithos.png","path":null,"size":34.85,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

Lithos es un nuevo protocolo diseñado para reformar cómo funcionan los pools de minería al trasladarlos a la cadena, dando a los mineros el control total y eliminando la necesidad de operadores de pools centralizados. A diferencia de la mayoría de los intentos anteriores de minería descentralizada, Lithos está construido para ser eficiente, escalable y seguro.

---

## ¿Qué es Lithos?

Lithos es un protocolo de pool de minería descentralizado que conecta a los mineros directamente con contratos inteligentes en Ergo. Estos contratos manejan todo: la presentación de trabajo, la gestión de la dificultad y los pagos, sin depender de servidores o custodios centralizados.

El protocolo utiliza **Stratum** para conectar el hardware de minería al cliente de Lithos, pero toda la lógica clave se ejecuta en la cadena. Los mineros presentan trabajo a los contratos inteligentes y reciben pagos directamente basados en un nuevo formato de prueba criptográfica.

Está diseñado para ser **agnóstico a la cadena de bloques**, lo que significa que podría soportar pools de minería para cualquier cadena de prueba de trabajo en el futuro. El cálculo y almacenamiento del trabajo ocurre en Ergo utilizando contratos inteligentes ErgoScript, mientras que la verificación de pagos para otras cadenas requeriría puentes ligeros.

La investigación inicial ya está en marcha para extender el soporte de Lithos a Bitcoin a través de un diseño interoperable.

---

## Cómo Funciona

Lithos combina dos ideas clave: **Pruebas de Participación No Interactivas (NISPs)** y **pools de minería colateralizados**, implementados a través de contratos inteligentes de Capa 2 (específicamente, un rollup optimista) en Ergo.

### NISPs: Prueba Sin Interacción

Las Pruebas de Participación No Interactivas permiten a los mineros presentar prueba de trabajo sin necesidad de interactuar de ida y vuelta con un servidor. Cada minero elige su propia dificultad, que determina con qué frecuencia recibe pagos y cuán grandes son esos pagos.

Los contratos inteligentes validan estas pruebas y emiten pagos, sin necesidad de coordinación centralizada.

### Pools Colateralizados

Los pools de minería en Lithos están respaldados por colateral. Los mineros y no mineros pueden apostar tokens ERG o LITHOS para colateralizar un pool. Esto permite:

* Producción de bloques local con selección completa de transacciones
* Resistencia a la censura
* Ejecución en cadena de la equidad de pagos
* Un mecanismo nativo de préstamos DeFi entre creadores de pools y apostadores

---

## Beneficios para los Mineros

* **Control total del bloque**: Los mineros seleccionan transacciones, recogen demurrage y MEV.
* **Pagos justos**: Los contratos inteligentes manejan todas las recompensas de manera transparente.
* **Sin riesgo de operador de pool**: No hay una parte centralizada que pueda hacer trampa o retrasar pagos.
* **Cliente local**: El minero de Lithos se ejecuta localmente para evitar latencia o acciones obsoletas.
* **Dificultad ajustable**: Los mineros pueden ajustar su dificultad de participación para que coincida con su hardware y preferencias de riesgo.

---

## Dificultad y Pagos

El protocolo introduce un modelo de pago único:

* **Mayor dificultad** = menos pero pagos más grandes
* **Menor dificultad** = pagos más frecuentes pero más pequeños

Las pruebas en el mundo real muestran que las recompensas totales permanecen proporcionales a la tasa de hash, pero los mineros pueden elegir cuán estables o volátiles son sus ganancias.

---

## Token LITHOS

El protocolo incluirá un token nativo:

* **Ganado** por los mineros como recompensa por usar pools descentralizados.
* **Requerido** para la colateralización de pools, vinculando a mineros y prestamistas.
* **Usado** para prevenir spam, fraude y ayudar con la secuenciación de rollup.

Se publicará más información en el próximo libro blanco.

---

## Últimas Actualizaciones de Desarrollo

* Los contratos finales de prueba de fraude están bajo revisión
* La implementación de alquiler de almacenamiento se ha refinado para prevenir ataques de reemplazo a nivel de bloque
* Se está construyendo un contrato de dificultad para prevenir manipulaciones post-minería
* Las pruebas del contrato de rollup y las correcciones de stratum están en curso
* La base de código se hará pública antes del lanzamiento de la testnet
* Investigación en curso sobre la integración de Bitcoin

El lanzamiento de la testnet se acerca, pendiente de la integración final de rollup y la estabilidad de stratum.

---

## ¿Qué Sigue?

La hoja de ruta de Lithos está estrechamente vinculada al lanzamiento de Sigma 6.0 en la mainnet de Ergo, que es un requisito previo para que Lithos se active.

Hasta entonces, el trabajo continúa hacia la primera testnet pública. La etapa final incluye:

* Completar y probar contratos de rollup y prueba de fraude
* Finalizar la integración del cliente de stratum
* Publicar la base de código pública para revisión por pares
* Continuar el desarrollo de los contratos de emisión, configuración y colateral
* Planificar la integración de BTC para una mayor compatibilidad del protocolo
* Finalizar el libro blanco que describe el diseño del sistema y la mecánica del token

Una vez que se alcancen estos hitos y Sigma 6.0 se active en la mainnet, Lithos estará listo para lanzarse.

---

## Recursos

* GitHub: [github.com/Lithos-Protocol](https://github.com/Lithos-Protocol)
* Telegram: [@LITHOS\_Protocol](https://t.me/LITHOS_Protocol)
* YouTube: [Demostración de Lithos en ErgoHack](https://www.youtube.com/watch?v=oCvNSxSff4k&feature=youtu.be)
