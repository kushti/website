---
cmsId: 2803
title: "Sigma 6.0: Um Ergo Mais Inteligente e Flexível"
slug: Sigma-6-0-A-Smarter-More-Flexible-Ergo
type: blog
locale: pt
date: "2025-07-23T12:40:00"
publishedAt: "2025-07-23T12:44:54.738"
updatedAt: "2025-08-25T19:05:05.865"
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

**Sigma 6.0** é uma grande atualização proposta para a blockchain Ergo. Ela oferece aos desenvolvedores ferramentas mais poderosas para construir contratos inteligentes, corrige limitações de longa data e prepara a rede para melhorias futuras—tudo isso sem quebrar a compatibilidade com contratos ou nós existentes.

A atualização está ocorrendo através de um soft-fork, o que significa que nós não mineradores existentes podem continuar operando, enquanto nós mineradores atualizados são necessários para ativar e impor os novos recursos.

A votação pelos mineradores já está em andamento, com apoio atualmente acima de 90%, e uma devnet está ativa para testes iniciais. Se isso continuar, Sigma 6.0 será ativado no final de setembro de 2025.


---

## Por Que Sigma 6.0 É Necessário?

Desde que a Ergo foi lançada em 2019, sua linguagem de contrato inteligente (ErgoTree) permaneceu estável. Essa estabilidade ajudou a rede a se manter segura, mas também dificultou para os desenvolvedores adicionarem novos recursos ou simplificarem sua lógica. Algumas melhorias foram planejadas desde os dias da testnet em 2018, mas nunca chegaram à mainnet—até agora.

Sigma 6.0 traz essas atualizações à tona. Ela expande o que é possível em um contrato, remove limitações técnicas e abre caminho para futuras melhorias de governança e escalabilidade.

---

## O Que Está Mudando?

* **Números mais poderosos** com um novo tipo de inteiro não assinado de 256 bits para operações criptográficas e financeiras
* **Melhor manipulação de dados** através do suporte total para serialização e desserialização de tipos complexos em contratos
* **Transações mais inteligentes** que podem acessar variáveis de contexto de outras entradas para uma lógica mais coordenada
* **Novas ferramentas matemáticas e de lista** incluindo operações bit a bit, deslocamento e métodos de coleção aprimorados como `.get` e `.startsWith`
* **Validação PoW embutida** para que contratos possam verificar cabeçalhos de bloco ou mensagens personalizadas contra Autolykos2
* **Governança atualizável** permitindo que a rede vote em novos parâmetros através de futuros soft-forks, começando com suporte para sub-blocos



---

## Cronograma de Ativação

Sigma 6.0 está passando por um processo de ativação de soft-fork que requer duas fases: um período de votação e um período de atualização. Cada um dura cerca de 45 dias, fazendo com que o lançamento completo leve aproximadamente 90 dias.

Os mineradores começaram a votar no início de julho de 2025, e o apoio já está acima do limite necessário de 90%. Se esse nível de apoio se mantiver, a atualização será ativada no final de setembro de 2025.

Mesmo que o consenso seja alcançado cedo, o protocolo ainda espera pelos períodos completos de votação e atualização antes de entrar em operação.

Uma devnet já está ativa para Sigma 6.0, e os desenvolvedores podem encontrar informações sobre como participar no chat da comunidade dev. Em julho, os testes de nós mineradores com suporte a sub-blocos começaram na testnet. Depois disso, o foco mudará para refinar a documentação e melhorar o raciocínio formal em torno da segurança ao longo de agosto, garantindo que a atualização permaneça orientada por pesquisa. Uma vez concluído, a atenção pode se voltar para um possível lançamento na mainnet.

---

## Para Desenvolvedores

Os novos recursos requerem a versão 3 ou superior do ErgoTree. Alguns tipos—como `Option`, `Header` e `UnsignedBigInt`—não podem ser armazenados diretamente em registros ou extensões de contexto, mas podem ser armazenados como dados de byte e restaurados dentro do contrato.

Exemplos de uso podem ser encontrados no [conjunto de testes Sigma no GitHub](https://github.com/ergoplatform/sigmastate-interpreter/blob/b754e143cf38ed86d95698ede744a470dfa053d6/sigmastate/src/test/scala/special/sigma/SigmaDslSpecification.scala#L10040).

---

## Por Que Isso É Importante

Sigma 6.0 é a maior atualização na camada de contratos inteligentes da Ergo desde o lançamento da rede. Ela oferece mais liberdade aos desenvolvedores, desbloqueia casos de uso totalmente novos e fortalece as fundações do protocolo—enquanto permanece totalmente compatível com versões anteriores.

Com o apoio dos mineradores agora acima de 90%, a atualização está a caminho de ser ativada em setembro. Sigma 6.0 coloca a Ergo em uma posição mais forte para o futuro.


## Recursos

- Proposta técnica completa: [EIP-0050: Sigma 6.0 no GitHub](https://github.com/ergoplatform/eips/blob/6102112617fff96fe88013858c307c2cf363babf/eip-0050.md)
- [Proposta de Soft-Fork 6.0 (ergoforum)](https://www.ergoforum.org/t/6-0-soft-fork-proposal/5005)
- [Resumo da Documentação Sigma 6.0](https://docs.ergoplatform.com/dev/protocol/sigma-6/)
