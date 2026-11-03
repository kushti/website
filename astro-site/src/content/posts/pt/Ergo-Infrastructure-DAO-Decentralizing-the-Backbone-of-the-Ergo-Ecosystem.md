---
cmsId: 2808
title: "Ergo Infrastructure DAO: Descentralizando a Espinha Dorsal do Ecossistema Ergo"
slug: Ergo-Infrastructure-DAO-Decentralizing-the-Backbone-of-the-Ergo-Ecosystem
type: blog
locale: pt
date: "2025-08-13T08:00:00"
publishedAt: "2025-08-13T11:52:43.574"
updatedAt: "2025-08-25T19:05:12.424"
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

A missão da Ergo sempre foi enraizada na descentralização, não apenas na camada de consenso, mas em toda a pilha. Com o lançamento do **Ergo Infrastructure DAO (InfraDAO)**, essa visão está se expandindo para os serviços e infraestrutura que alimentam o ecossistema todos os dias.

O InfraDAO agora está oficialmente ativo em [Paideia](https://app.paideia.im/ergoinfradao), após uma votação de governança bem-sucedida. O que começou como uma proposta de base vinda do grupo de contribuidores **Sigmanauts**—liderada pelo Sigmanaut favorito de todos, **qx**, conhecido por suas aparições em AMAs da Ergo e em outros lugares do ecossistema—agora amadureceu em uma iniciativa de propriedade comunitária que irá remodelar como os serviços essenciais são entregues e mantidos.

---

## O Que É o Ergo Infrastructure DAO?

O InfraDAO é uma rede descentralizada, operada por pares, de provedores de infraestrutura responsáveis por manter serviços-chave no ecossistema Ergo. Isso inclui:

* Nós completos e APIs
* Exploradores de blockchain
* Infraestrutura de testnet e mineração
* Documentação comunitária e espelhos
* Ferramentas como SigmaSpace, ErgoDocs e Sigmaverse
* Futuro hospedagem e gerenciamento do ergoplatform.org

Este DAO reduzirá a dependência da Ergo Foundation e garantirá que a infraestrutura seja resistente à censura, tolerante a falhas e governada de forma transparente.

---

## Por Que Isso É Importante

Até agora, grande parte da infraestrutura da Ergo, incluindo pontos de extremidade públicos, exploradores de blocos e documentação hospedada, foi mantida pela **Ergo Foundation** e depois pelo **Developer DAO**. Embora esse modelo tenha proporcionado estabilidade e confiabilidade iniciais, também criou pontos centrais de dependência.

O InfraDAO muda isso ao distribuir responsabilidades por uma rede global e autogerida de contribuintes que executam e mantêm a pilha. Ele garante:

* Serviços mais resilientes e geograficamente distribuídos
* Sustentabilidade a longo prazo sem dependência da Fundação
* Controle comunitário sobre governança e implantação
* Um modelo operacional verdadeiramente descentralizado para corresponder aos princípios centrais da Ergo

---

## O Que Já Está Ativo e Migrado

O InfraDAO já fez progressos. Três máquinas de alto desempenho, balanceadas em múltiplos pontos de extremidade, estão agora ativas e sincronizadas usando o backend de armazenamento mais rápido **RocksDB**:

* [explorer-p2p.ergoplatform.com](https://explorer-p2p.ergoplatform.com)
* [graphql-p2p.ergoplatform.com](https://graphql-p2p.ergoplatform.com)
* [api-p2p.ergoplatform.com](https://api-p2p.ergoplatform.com)
* [node-p2p.ergoplatform.com](https://node-p2p.ergoplatform.com/panel) (compatível com HTTPS para carteiras)

Esses pontos de extremidade são **totalmente compatíveis com carteiras móveis e baseadas em navegador** e servem como uma base para acesso descentralizado à rede Ergo.

Você pode monitorar o tempo de atividade e a disponibilidade de pares através do painel público:
[Ergo Infrastructure DAO – Painel de Status em Tempo Real](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## P2P, Balanceamento de Carga e Operadores Comunitários

Enquanto “P2P” aqui se refere vagamente a uma rede distribuída, a infraestrutura é verdadeiramente gerida pela comunidade. O balanceamento de carga inicial incluirá máquinas operadas por:

* qx (três nós)
* Jumei
* 2ndTL Mining
* Sheetoshi

Essas são estrategicamente implantadas para suportar balanceamento de carga baseado em geolocalização global. Mais máquinas comunitárias serão adicionadas à medida que o DAO se expande, formando uma espinha dorsal totalmente descentralizada e globalmente resiliente.

O processo de seleção para novos participantes envolverá:

1. Um **endereço IP estático**
2. **Largura de banda de upload suficiente**
3. Um **entendimento básico de infraestrutura** (ou capacidade de seguir instruções de configuração de linha de comando)
4. Um **endereço de correspondência** para envio de um nó ou explorador pré-configurado (fornecido gratuitamente)

---

## Da Ideia à Execução: Construído pela Comunidade

O InfraDAO começou como uma iniciativa interna entre os Sigmanauts. Reconhecendo a necessidade de descentralizar a infraestrutura, **qx** propôs a criação de um DAO e liderou sua implantação.

Em julho de 2025, uma proposta solicitando **50.000 \$PAIDEIA** foi aprovada com sucesso no Paideia. Esses fundos estão cobrindo custos iniciais, como preparação de máquinas, envio e integração de contribuintes. O token do DAO agora está ativo, e a governança está em funcionamento.

---

## Requisitos Técnicos

**Requisitos de Hardware e Rede:**
* Largura de banda de upload: 50 Mbps ou mais
* Latência: \~100ms ou menos para sua região local
* IPv4: IP estático ou dinâmico de longo prazo
* Especificações da máquina:
  * Ubuntu OS
  * 16GB de RAM (32GB recomendado)
  * 1TB SSD
  * Docker, tmux, acesso SSH e habilidades de edição de configuração

Esses sistemas são otimizados para alta disponibilidade e estão atualmente servindo tráfego de produção através de pontos de extremidade balanceados.

---

## Não Apenas Hospedagem: Expansão Futura

Enquanto a primeira fase do InfraDAO se concentra na hospedagem, ele crescerá para suportar:

* Manutenção e monitoramento de infraestrutura
* Atualizações de dependência e segurança
* Orquestração de Docker e implantação de software
* Gerenciamento de CMS para ergoplatform.org
* Publicação e atualizações de documentação
* Serviços de hospedagem como SigmaSpace, ErgoDocs e Sigmaverse

Isso abre a participação para administradores de sistema, desenvolvedores de backend, mantenedores de conteúdo e outros contribuintes além de operadores de nós.

---

## Status Atual

* DAO ativo no Paideia
* Proposta de financiamento inicial aprovada
* Token cunhado e votação ativa
* Primeira onda de infraestrutura ativa e operacional
* Painel de monitoramento público online
* Próximo: mais contribuintes e expansão global

---

## Como Participar

Se você tem capacidade técnica e deseja executar infraestrutura, manter tempo de atividade, atualizar sites ou participar da governança do DAO, agora é a hora de entrar.

→ Junte-se ao DAO ou siga propostas aqui:
[https://app.paideia.im/ergoinfradao](https://app.paideia.im/ergoinfradao)

→ Monitore o status da infraestrutura:
[https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi](https://infra-p2p.ergoplatform.com/cgi-bin/dashboard.cgi)

---

## Considerações Finais

O lançamento do Ergo Infrastructure DAO é um grande passo em direção à descentralização de pilha completa, autonomia, controle comunitário e sustentabilidade de um ecossistema de blockchain orientado por missão.

Com a governança em cadeia, infraestrutura de propriedade da comunidade e contribuintes globais já executando serviços críticos, a Ergo está mostrando como é a verdadeira descentralização.

Ajude a construir a fundação. Envolva-se.
