# Análise de Usuários

Projeto de análise de usuários com base em posts e comentários usando API pública.

---

## O que faz

* Lista usuários
* Permite selecionar um usuário
* Aplica filtros (mínimo de caracteres e posts)
* Calcula métricas
* Mostra resultado na tela
* Gera CSV
* Simula envio de relatório (POST)

---

## Estrutura

```
/src
  api/        // chamadas da API
  services/   // regras de negócio (metrics)
  ui/         // renderização
  utils/      // debounce e cache
  main.js     // fluxo principal
```

---

## Tecnologias

* JavaScript
* HTML
* Fetch API

---

## API

Usando JSONPlaceholder.

O envio do relatório foi simulado com `/posts` já que `/reports` não existe.

---

## Testes

Teste feito na parte de metrics (regras de negócio).

---

## Observações

* Usei debounce nos inputs
* Usei cache para evitar requisições repetidas
* Também aproveita cache do navegador (304)

---
