# Análise de Usuários

Projeto desenvolvido para análise de usuários com base em posts e comentários consumidos de uma API pública.
A aplicação permite selecionar usuários, aplicar filtros, calcular métricas, gerar relatórios em CSV e simular envio de relatórios.

---

## Funcionalidades

* Listagem de usuários via API;
* Seleção de usuário para análise;
* Aplicação de filtros por quantidade mínima de caracteres e posts;
* Cálculo de métricas dos posts e comentários;
* Exibição dos resultados na interface;
* Geração de relatório CSV;
* Simulação de envio de relatório via requisição POST;
* Cache local para reduzir chamadas repetidas à API;
* Debounce nos filtros para otimizar atualizações.

---

## Arquitetura do Sistema

O projeto foi estruturado de forma modular, separando responsabilidades entre consumo de API, regras de negócio, interface e utilitários.

### Estrutura de pastas

```bash
/src
  /api         # chamadas para a API pública
  /services    # regras de negócio e cálculo de métricas
  /ui          # renderização dos resultados na interface
  /utils       # debounce e cache
  main.js      # fluxo principal da aplicação

/tests
  metrics.test.js  # testes das regras de negócio
```

### Organização dos módulos

* **api/**: responsável por buscar usuários, posts e comentários, além de simular envio de relatórios;
* **services/**: concentra o cálculo das métricas e regras de negócio;
* **ui/**: responsável pela renderização dos resultados;
* **utils/**: funções auxiliares para debounce e cache;
* **main.js**: coordena o fluxo principal da aplicação.

Essa arquitetura foi adotada para melhorar legibilidade, manutenção e separação de responsabilidades.

---

## Fluxo de Eventos

O fluxo principal da aplicação ocorre da seguinte forma:

1. Ao carregar a página, a aplicação busca a lista de usuários pela API;
2. O usuário seleciona um perfil para análise;
3. São buscados os posts do usuário selecionado;
4. Para cada post, os comentários são carregados;
5. Os dados passam pelo cálculo de métricas;
6. Os resultados são exibidos na interface;
7. O usuário pode gerar um relatório CSV;
8. O sistema simula o envio do relatório via POST.

Esse fluxo garante que a aplicação carregue e processe os dados dinamicamente de forma organizada.

---

## Linguagens, Bibliotecas e Ferramentas Utilizadas

### Linguagens

* JavaScript
* HTML

### APIs e recursos

* Fetch API
* JSONPlaceholder

### Ferramentas

* Node.js
* Git
* GitHub

### Testes

* Testes unitários com script customizado em Node.js

---

## Decisões Técnicas

Durante o desenvolvimento, algumas decisões técnicas foram tomadas para garantir melhor desempenho e organização:

### Estrutura modular

A separação em módulos permitiu isolar responsabilidades, facilitando manutenção e testes.

### Uso de cache local

Foi implementado cache para armazenar posts e comentários já carregados, reduzindo requisições repetidas e melhorando desempenho.

### Debounce nos filtros

Foi utilizado debounce nos inputs para evitar recálculos excessivos enquanto o usuário digita, melhorando a experiência de uso.

### Simulação de envio de relatório

Como a API pública não possui um endpoint real para relatórios, foi utilizada uma rota simulada para demonstrar o fluxo completo.

Essas decisões foram tomadas pensando em eficiência, clareza e escalabilidade.

---

## Problemas Encontrados e Soluções

### 1. Requisições repetidas para posts e comentários

**Problema:** a cada seleção, os dados eram carregados novamente da API, causando chamadas desnecessárias.

**Solução:** implementação de cache local para reutilizar dados já carregados.

---

### 2. Atualizações excessivas durante digitação

**Problema:** cada alteração nos filtros disparava novos cálculos imediatamente.

**Solução:** aplicação de debounce para reduzir o número de atualizações.

---

### 3. Ausência de endpoint real para relatórios

**Problema:** a API pública não disponibiliza endpoint específico para envio de relatórios.

**Solução:** simulação do envio utilizando endpoint disponível, apenas para demonstrar a lógica.

---

## Testes

Foi implementado um teste unitário para validar as regras de negócio relacionadas ao cálculo de métricas.

O arquivo:

```bash
/tests/metrics.test.js
```

verifica cenários como:

* total de posts;
* média de caracteres;
* média de comentários;
* status ativo/inativo;
* comportamento sem posts válidos.

Os testes podem ser executados com:

```bash
npm test
```

---

## Como Executar o Projeto

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
```

2. Acesse a pasta:

```bash
cd Case_Dados_Automacoes
```

3. Execute o projeto em um servidor local.

4. Para rodar os testes:

```bash
npm test
```

---

## Observações

A aplicação foi desenvolvida priorizando:

* organização modular;
* reutilização de código;
* otimização de requisições;
* clareza nas regras de negócio;
* facilidade de manutenção.

O projeto demonstra a implementação de integração com API, processamento de dados, otimização com cache e testes básicos de lógica.
