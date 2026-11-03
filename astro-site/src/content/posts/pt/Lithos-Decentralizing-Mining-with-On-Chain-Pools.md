---
cmsId: 2804
title: "Lithos: Descentralizando a Mineração com Pools On-Chain"
slug: Lithos-Decentralizing-Mining-with-On-Chain-Pools
type: blog
locale: pt
date: "2025-07-24T14:20:00"
publishedAt: "2025-07-24T14:21:09.732"
updatedAt: "2025-08-25T19:05:06.974"
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

Lithos é um novo protocolo projetado para reformular como os pools de mineração funcionam, movendo-os para on-chain, dando aos mineradores controle total e eliminando a necessidade de operadores de pool centralizados. Ao contrário da maioria das tentativas anteriores de mineração descentralizada, Lithos foi construído para ser eficiente, escalável e seguro.

---

## O Que É Lithos?

Lithos é um protocolo de pool de mineração descentralizado que conecta mineradores diretamente a contratos inteligentes na Ergo. Esses contratos gerenciam tudo—submissão de trabalho, gerenciamento de dificuldade e pagamentos—sem depender de servidores ou custodiante centralizados.

O protocolo usa **Stratum** para conectar o hardware de mineração ao cliente Lithos, mas toda a lógica chave é executada on-chain. Os mineradores submetem trabalho a contratos inteligentes e recebem pagamentos diretamente com base em um novo formato de prova criptográfica.

Ele é projetado para ser **agnóstico a blockchain**, o que significa que pode suportar pools de mineração para qualquer cadeia de proof-of-work no futuro. A computação e o armazenamento de trabalho ocorrem na Ergo usando contratos inteligentes ErgoScript, enquanto a verificação de pagamentos para outras cadeias exigiria pontes leves.

Pesquisas iniciais já estão em andamento para estender o suporte do Lithos ao Bitcoin por meio de um design interoperável.

---

## Como Funciona

Lithos combina duas ideias principais: **Provas de Ação Não Interativas (NISPs)** e **pools de mineração colateralizados**, implementados por meio de contratos inteligentes de Camada 2 (especificamente, um rollup otimista) na Ergo.

### NISPs: Prova Sem Interação

As Provas de Ação Não Interativas permitem que os mineradores submetam prova de trabalho sem precisar interagir de volta e para frente com um servidor. Cada minerador escolhe sua própria dificuldade, que determina com que frequência eles são pagos e quão grandes são esses pagamentos.

Os contratos inteligentes validam essas provas e emitem pagamentos, sem necessidade de coordenação centralizada.

### Pools Colateralizados

Os pools de mineração no Lithos são garantidos por colateral. Mineradores e não-mineradores podem apostar tokens ERG ou LITHOS para colateralizar um pool. Isso possibilita:

* Produção local de blocos com seleção total de transações
* Resistência à censura
* Execução on-chain da equidade de pagamento
* Um mecanismo nativo de empréstimo DeFi entre criadores de pools e apostadores

---

## Benefícios para Mineradores

* **Controle total do bloco**: Mineradores selecionam transações, coletam demurrage e MEV.
* **Pagamentos justos**: Contratos inteligentes gerenciam todas as recompensas de forma transparente.
* **Sem risco de operador de pool**: Não há parte centralizada que possa trapacear ou atrasar pagamentos.
* **Cliente local**: O minerador Lithos opera localmente para evitar latência ou ações obsoletas.
* **Dificuldade ajustável**: Mineradores podem ajustar a dificuldade de suas ações para corresponder ao seu hardware e preferências de risco.

---

## Dificuldade e Pagamentos

O protocolo introduz um modelo de pagamento único:

* **Dificuldade maior** = menos pagamentos, mas maiores
* **Dificuldade menor** = pagamentos mais frequentes, mas menores

Testes no mundo real mostram que as recompensas totais permanecem proporcionais à taxa de hash, mas os mineradores podem escolher quão estáveis ou voláteis são seus ganhos.

---

## Token LITHOS

O protocolo incluirá um token nativo:

* **Ganho** pelos mineradores como recompensa por usar pools descentralizados.
* **Necessário** para colateralização de pools, ligando mineradores e credores.
* **Usado** para prevenir spam, fraudes e ajudar na sequenciação de rollup.

Mais informações serão divulgadas no próximo whitepaper.

---

## Últimas Atualizações de Desenvolvimento

* Contratos finais de prova de fraude estão sob revisão
* Implementação de aluguel de armazenamento refinada para prevenir ataques de substituição em nível de bloco
* Contrato de dificuldade está sendo construído para prevenir manipulação pós-mineração
* Testes de contrato de rollup e correções de stratum estão em andamento
* A base de código será tornada pública antes do lançamento da testnet
* Pesquisa em andamento sobre integração com Bitcoin

O lançamento da testnet está se aproximando, aguardando a integração final do rollup e a estabilidade do stratum.

---

## O Que Vem a Seguir

O roadmap do Lithos está intimamente ligado ao lançamento do Sigma 6.0 na mainnet da Ergo, que é um pré-requisito para o Lithos entrar em operação.

Até lá, o trabalho continua em direção à primeira testnet pública. A fase final inclui:

* Completar e testar contratos de rollup e prova de fraude
* Finalizar a integração do cliente stratum
* Liberar a base de código pública para revisão por pares
* Continuar o desenvolvimento dos contratos de emissão, configuração e colateral
* Planejar a integração do BTC para maior compatibilidade do protocolo
* Finalizar o whitepaper que descreve o design do sistema e a mecânica do token

Uma vez que esses marcos sejam alcançados e o Sigma 6.0 seja ativado na mainnet, o Lithos estará pronto para ser lançado.

---

## Recursos

* GitHub: [github.com/Lithos-Protocol](https://github.com/Lithos-Protocol)
* Telegram: [@LITHOS\_Protocol](https://t.me/LITHOS_Protocol)
* YouTube: [Demonstração do Lithos no ErgoHack](https://www.youtube.com/watch?v=oCvNSxSff4k&feature=youtu.be)
