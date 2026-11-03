---
cmsId: 2795
title: "DexyGold Beta Llega a la Mainnet de Ergo: Un Nuevo Estándar para el Oro en Cadena"
slug: DexyGold-Beta-Hits-Ergo-Mainnet-A-New-Standard-for-On-Chain-Gold
type: news
locale: es
date: "2025-07-15T11:50:00"
publishedAt: "2025-07-15T12:04:43.443"
updatedAt: "2025-08-25T19:04:07.607"
author: Ergo Platform
tags: ["Ecosystem"]
spotlight: false
subtitle: null
image: {"url":"/uploads/dexy_1880f3be68.png","alt":"dexy.png","width":1280,"height":640,"mime":"image/png","formats":{"large":{"ext":".png","url":"/uploads/large_dexy_1880f3be68.png","hash":"large_dexy_1880f3be68","mime":"image/png","name":"large_dexy.png","path":null,"size":733.13,"width":1000,"height":500},"small":{"ext":".png","url":"/uploads/small_dexy_1880f3be68.png","hash":"small_dexy_1880f3be68","mime":"image/png","name":"small_dexy.png","path":null,"size":194.26,"width":500,"height":250},"medium":{"ext":".png","url":"/uploads/medium_dexy_1880f3be68.png","hash":"medium_dexy_1880f3be68","mime":"image/png","name":"medium_dexy.png","path":null,"size":421.49,"width":750,"height":375},"thumbnail":{"ext":".png","url":"/uploads/thumbnail_dexy_1880f3be68.png","hash":"thumbnail_dexy_1880f3be68","mime":"image/png","name":"thumbnail_dexy.png","path":null,"size":53.43,"width":245,"height":123}}}
authorPhoto: null
blogPhoto: null
externalUrl: null
superseded: false
---

### Un Hito para Ergo DeFi

La beta pública de la mainnet de DexyGold está activa y ya está moviendo valor real. La moneda tiene como objetivo el precio en USD de una onza troy de oro, confiando en dos contratos principales:

* **Contrato Bancario** — emite DexyGold cuando los usuarios depositan ERG al precio del oráculo.
* **Pool de Liquidez AMM** — permite a los traders descubrir una tasa de mercado y aplica límites que protegen las reservas.

Ambos contratos utilizan el nuevo [**feed de oráculo Gold v2**](https://explorer.ergoplatform.com/en/oracle-pool-state/xauerg), que se actualiza más rápido y añade protecciones adicionales contra la manipulación. Con DexyGold funcionando bien, la comunidad se está preparando para actualizar el pool de oráculos USD a v2 y lanzar **GluonUSD** y **DexyUSD**. Se está formando un grupo de Telegram para personas que quieran ejecutar oráculos v2, y también se necesita ayuda para probar la actualización del pool de oráculos en testnet.

---

### ¿Por Qué Apuntar al Oro, No a los Dólares?

El oro evita el riesgo de un solo gobierno y ha mantenido su valor frente a la inflación a largo plazo durante siglos. Una stablecoin vinculada al oro completa la pila DeFi de Ergo, ofreciendo a los usuarios una cobertura que complementa a los rastreadores de USD como SigmaUSD.

---

### Bajo el Capó

| Parte del Motor     | Rol en la Vinculación                                                                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Contrato Bancario**  | Emite DexyGold por ERG al precio del oráculo. La oferta solo crece cuando los usuarios añaden ERG.                                                                                 |
| **Pool de Liquidez** | Publica un precio en vivo de DexyGold / ERG. La matemática del pool refleja Uniswap V2 y bloquea el canje de tokens LP si el precio del oráculo cae más del 10 % por debajo del precio del pool. |
| **Bucle de Arbitraje** | *Oráculo > Pool* → los usuarios emiten DexyGold y venden al pool. *Oráculo < Pool* → el banco gasta ERG inactivo y compra DexyGold después de un retraso de 50 bloques.                  |
| **Válvulas de Seguridad**  | Bloqueos temporales en DexyGold fresco, bloqueos de ERG en el banco, y una pausa automática de emisión cuando las ganancias parecen excesivas.                                                     |

---

### Cómo Probar DexyGold Hoy

1. **Instala [Nautilus](https://nautiluswallet.io/)** y elige la red de mainnet.
2. **Añade un saldo modesto de ERG** a través de un intercambio, pago de minero, o el [puente Rosen](https://app.rosenbridge.io/).
3. **Abre [Crystal Pool](https://crystalpool.cc)**—el único lugar para emitir DexyGold y comerciar con él. Emite en la interfaz del Banco, proporciona liquidez, o coloca órdenes limitadas.
4. **Comienza pequeño:** Los contratos están activos y tienen valor real mientras continúan las auditorías y el ajuste de parámetros. Las órdenes se liquidan en cadena en segundos.


#### Crystal Pool en Foco

Crystal Pool es un nuevo DEX de Capa-1 en la blockchain de Ergo enfocado en la interacción directa con contratos inteligentes con la mejor liquidez en cadena disponible. Ofrece:

* Emparejamiento de Órdenes Directo en cadena sin libros de órdenes fuera de cadena
* Operaciones Multi-Tokens, Multi-Vendedores en una sola transacción
* Encadenamiento de Transacciones en Tiempo Real, permitiendo un comercio fluido para cientos de usuarios en paralelo
* Gráficos Integrados e Historial de Comercio, mostrando tus operaciones directamente en gráficos de precios

Próximamente en 2025: Pools de Liquidez de Órdenes Limitadas, habilitando estrategias de creación de mercado más profundas.

Crystal Pool tiene como objetivo convertirse en la capa de liquidez central para Ergo DeFi—simple, rápida y transparente.


---

### Hoja de Ruta de DexyGold

* **Segunda Auditoría** para probar el bucle de arbitraje y mejorar el ajuste de parámetros.
* **Objetivo de Ratio de Colateral** por encima del 150 por ciento a medida que las tarifas de emisión construyen reservas en el banco.
* **Despliegue del Pool de Oráculos USD v2** con operadores de la comunidad y pruebas en testnet.
* Lanzamientos de **GluonUSD y DexyUSD** después de la actualización del feed de oráculo USD, expandiendo la suite de stablecoins.

---

### Crece la Adopción del Oráculo Gold v2

DexyGold es el segundo proyecto en adoptar el feed Gold v2. El primero, **gluon.gold**, recientemente presentó un [frente beta renovado](https://gluon.gold/reactor) que rastrea tarifas, ratio de reservas, TVL, volumen y transacciones pendientes con mayor claridad—un testimonio de lo rápido que el nuevo oráculo se está convirtiendo en la columna vertebral de los productos basados en oro de Ergo.

---

### Únete a la Conversación

Lee el borrador del documento técnico de Dexy, comparte tus comentarios en **r/ergonauts**, y únete a la comunidad en [Telegram](http://t.me/dexygold) o [Discord](https://discord.gg/xjfnk9A2cU). Tus pruebas en el mundo real y reportes de errores ayudarán a dar forma a los parámetros finales de una familia de stablecoins respaldadas por oro y dólares en Ergo.
