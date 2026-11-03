---
cmsId: 2813
title: "DexyGold Beta Chega à Mainnet do Ergo: Um Novo Padrão para Ouro On-Chain"
slug: DexyGold-Beta-Hits-Ergo-Mainnet-A-New-Standard-for-On-Chain-Gold
type: news
locale: pt
date: "2025-07-15T11:50:00"
publishedAt: "2025-07-15T12:04:43.443"
updatedAt: "2025-08-25T19:59:50.728"
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

### Um Marco para o Ergo DeFi

A beta pública da mainnet do DexyGold está ativa e já movimentando valor real. A moeda tem como alvo o preço em USD de uma onça troy de ouro, confiando em dois contratos principais:

* **Contrato do Banco** — emite DexyGold quando os usuários depositam ERG ao preço do oráculo.
* **Pool de Liquidez AMM** — permite que os traders descubram uma taxa de mercado e impõe limites que protegem as reservas.

Ambos os contratos utilizam o novo [**feed do oráculo Gold v2**](https://explorer.ergoplatform.com/en/oracle-pool-state/xauerg), que atualiza mais rápido e adiciona proteções extras contra manipulação. Com o DexyGold indo bem, a comunidade agora está se preparando para atualizar o pool de oráculos USD para v2 e lançar **GluonUSD** e **DexyUSD**. Um grupo no Telegram está se formando para pessoas que desejam operar oráculos v2, e ajuda para testar a atualização do pool de oráculos na testnet também é muito necessária.

---

### Por Que Mirar no Ouro, Não em Dólares?

O ouro evita o risco de um único governo e tem se mantido à frente da inflação de longo prazo por séculos. Uma stablecoin atrelada ao ouro completa a pilha DeFi do Ergo, oferecendo aos usuários uma proteção que complementa rastreadores de USD como SigmaUSD.

---

### Sob o Capô

| Parte do Motor     | Papel no Peg                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Contrato do Banco**  | Emite DexyGold por ERG ao preço do oráculo. A oferta só cresce quando os usuários adicionam ERG.                                                                                 |
| **Pool de Liquidez** | Publica um preço ao vivo de DexyGold / ERG. A matemática do pool espelha o Uniswap V2 e bloqueia a troca de tokens LP se o preço do oráculo cair mais de 10% abaixo do preço do pool. |
| **Ciclo de Arbitragem** | *Oráculo > Pool* → os usuários emitem DexyGold e vendem para o pool. *Oráculo < Pool* → o banco gasta ERG ocioso e compra DexyGold após um atraso de 50 blocos.                  |
| **Válvulas de Segurança**  | Bloqueios de tempo em DexyGold fresco, bloqueios de ERG no banco e uma pausa automática na emissão quando os lucros parecem excessivos.                                                     |

---

### Como Experimentar o DexyGold Hoje

1. **Instale [Nautilus](https://nautiluswallet.io/)** e escolha a rede mainnet.
2. **Adicione um saldo modesto de ERG** via exchange, pagamento de minerador ou a [ponte Rosen](https://app.rosenbridge.io/).
3. **Abra [Crystal Pool](https://crystalpool.cc)**—o único lugar para emitir DexyGold e negociá-lo. Emita na interface do Banco, forneça liquidez ou faça ordens limitadas.
4. **Comece pequeno:** Os contratos estão ativos e mantêm valor real enquanto as auditorias e o ajuste de parâmetros continuam. As ordens são liquidadas na blockchain em segundos.


#### Crystal Pool em Foco

Crystal Pool é um novo DEX de Camada-1 na blockchain do Ergo focado na interação direta com contratos inteligentes com a melhor liquidez on-chain disponível. Ele oferece:

* Correspondência de Ordens Diretas on-chain sem livros de ordens off-chain
* Negociações Multi-Token, Multi-Vendedor em uma única transação
* Encadeamento de Transações em Tempo Real, permitindo negociações contínuas para centenas de usuários em paralelo
* Gráficos Integrados e Histórico de Negociações, mostrando seus negócios diretamente nos gráficos de preços

Chegando mais tarde em 2025: Pools de Liquidez de Ordens Limitadas, permitindo estratégias de criação de mercado mais profundas.

Crystal Pool visa se tornar a camada de liquidez central para o Ergo DeFi—simples, rápida e transparente.


---

### Roteiro do DexyGold

* **Segunda Auditoria** para testar o ciclo de arbitragem e melhorar o ajuste de parâmetros.
* **Meta de Razão de Colateral** acima de 150 por cento à medida que as taxas de emissão constroem reservas no banco.
* **Lançamento do Pool de Oráculos USD v2** com operadores da comunidade e testes na testnet.
* **Lançamentos de GluonUSD e DexyUSD** após a atualização do feed do oráculo USD, expandindo a suíte de stablecoins.

---

### Adoção do Oráculo Gold v2 Cresce

DexyGold é o segundo projeto a adotar o feed Gold v2. O primeiro, **gluon.gold**, recentemente revelou um [front-end beta atualizado](https://gluon.gold/reactor) que rastreia taxas, razão de reservas, TVL, volume e transações pendentes com maior clareza—um testemunho de quão rapidamente o novo oráculo está se tornando a espinha dorsal dos produtos baseados em ouro do Ergo.

---

### Junte-se à Conversa

Leia o rascunho do white paper do Dexy, compartilhe feedback em **r/ergonauts**, e junte-se à comunidade no [Telegram](http://t.me/dexygold) ou [Discord](https://discord.gg/xjfnk9A2cU). Seus testes no mundo real e relatórios de bugs ajudarão a moldar os parâmetros finais de uma família resiliente de stablecoins lastreadas em ouro e dólar no Ergo.
