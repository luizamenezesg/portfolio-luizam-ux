# Economizando — Ficha técnica para o portfólio

## Em uma frase
Web app que compara preços de supermercado entre mercados próximos ao usuário, calcula o preço por kg/L/unidade para comparar embalagens de tamanhos diferentes e ajuda a montar e compartilhar listas de compras. Do protótipo de UX (curso EBAC) a um MVP funcional gerado com IA no Figma Make.

## 1. Requisitos
### Requisitos de negócio
- Ajudar o usuário a economizar sem abrir dezenas de abas: uma busca mostra onde cada produto está mais barato.
- Gerar confiança (azul) e engajamento (amarelo, tom casual e entusiasmado).
- Não é e-commerce: sem carrinho nem pagamento; o valor está em decidir onde comprar.

### Requisitos funcionais
- RF01 Buscar produtos (sem diferenciar acento e maiúscula) e filtrar por categoria, mercado, preço máximo, distância e "só promoções".
- RF02 Ordenar por menor preço por unidade (padrão), menor preço total, mais próximo e melhor avaliado.
- RF03 Calcular o preço por unidade (R$/kg, R$/L, R$/un) e destacar o "Melhor custo-benefício".
- RF04 Usar a localização (GPS do navegador ou Santos-SP como padrão) e um raio de busca.
- RF05 Comparar até 6 produtos lado a lado.
- RF06 CRUD de listas de compras: criar, renomear, duplicar e excluir; itens com quantidade e checkbox.
- RF07 Calcular subtotal, total marcado, economia estimada e o mercado onde a lista inteira sai mais barata.
- RF08 Compartilhar a lista por WhatsApp, e-mail ou link, que abre a lista em modo leitura com a opção "Salvar uma cópia".
- RF09 Avaliar produtos (1 a 5 estrelas e comentário) e recalcular a média.
- RF10 Favoritar produtos e ver o histórico de preço de 90 dias, com o selo "abaixo da média".
- RF11 Perfil com nome, localização, raio e mercados preferidos.

### Requisitos não funcionais
- Responsivo (desktop até 1728px; no mobile, barra de navegação inferior).
- Acessível: aria-labels, foco visível, estrelas operáveis por teclado, alt nas imagens.
- Persistência local: os dados sobrevivem ao recarregar a página.
- Código tipado (TypeScript) e regra de cálculo coberta por teste.
- Arquitetura preparada para trocar os dados simulados por uma API real.

## 2. Tecnologias
| Camada | Tecnologia | Para quê |
|---|---|---|
| Geração | Figma Make (IA) | Gerar o app a partir do prompt e das telas |
| Linguagem | TypeScript 5 | Tipagem dos modelos (Produto, Mercado, Oferta, Lista) |
| UI | React 19 | Componentes e estado |
| Rotas | React Router 7 | 11 rotas com URL própria |
| Estilo | Tailwind CSS 4 + CSS | Identidade visual do Figma |
| Ícones | Lucide React | Lupa, coração, lista, perfil, compartilhar |
| Build | Vite 8 | Servidor de desenvolvimento e build |
| Testes | Vitest | Testes unitários da normalização de preço |
| Formatação | oxfmt | Padronização do código |

## 3. Arquitetura
SPA (single-page application), 100% front-end. Não há servidor próprio: o "backend" é simulado por uma camada de serviços. Estrutura:
- types.ts: modelo de dados.
- data/mock.ts: base simulada.
- services/prices.ts: regras de negócio (busca, preço por unidade, distância, melhor oferta).
- services/repository.ts: persistência (localStorage), isolada atrás de load()/save().
- app/store.tsx: estado global com Context API (listas, comparação, favoritos, localização, toasts).
- app/routes.tsx + pages*.tsx + components.tsx: telas e componentes.

Decisão de arquitetura: UI, regras e dados ficam separados (padrão Repository + Service). Para usar dados reais (Supabase ou uma API de preços), basta trocar o repositório e o serviço, sem refazer as telas.

## 4. Dados
- 9 mercados reais da Baixada Santista (Carrefour, Assaí, Atacadão, Pão de Açúcar, Extra, Dia, Covabra, Varandas, Forte Itapema), com endereço e coordenadas.
- 41 produtos em 12 categorias, com o mesmo item em embalagens diferentes.
- Cada produto tem de 3 a 6 ofertas; cada oferta tem preço, flag de promoção e histórico de 8 pontos.
- Preços gerados por fórmula (simulados), não coletados de sites reais.

## 5. Lógica principal
- Preço por unidade: g→kg e ml→L antes de dividir (ex.: R$ 10 em 500 g = R$ 20/kg).
- Distância: fórmula de Haversine entre o usuário e o mercado.
- Melhor oferta: filtra por raio, mercado e promoção, e ordena por preço/unidade.
- Melhor mercado da lista: soma a lista em cada mercado e escolhe o menor total.
- Busca sem acento: normalização Unicode NFD.
- Moeda: Intl.NumberFormat pt-BR (R$ 1.234,56).
- Link compartilhável: lista serializada em JSON e codificada em Base64 na URL.
- Latência simulada (320 ms) para exercitar o estado de carregamento (skeleton).

## 6. APIs
Nenhuma API externa paga ou com chave. Usa APIs nativas do navegador:
- Geolocation API (localização)
- Web Storage / localStorage (persistência)
- Clipboard API (copiar link)
- Intl API (formatar moeda)
- Deep links: wa.me (WhatsApp) e mailto: (e-mail)
- Imagens via CDN do Unsplash

## 7. Heurísticas de Nielsen aplicadas
1. Visibilidade do status: skeleton no carregamento, toasts de confirmação, contador da comparação.
2. Correspondência com o mundo real: "o kg sai por R$ 4,98", "1,4 km de você", termos do dia a dia.
3. Controle e liberdade: renomear e duplicar listas, listas ilimitadas, "Desfazer" ao excluir.
4. Consistência e padrões: mesmos rótulos para as mesmas ações, botão amarelo para toda ação primária.
5. Prevenção de erros: confirmação antes de excluir, validação (nota obrigatória, comentário com no mínimo 10 caracteres), limite de 6 itens na comparação.
6. Reconhecimento em vez de memorização: favoritos, localização e filtros lembrados, selo "Melhor custo-benefício".
7. Flexibilidade e eficiência: adicionar à lista a partir de 3 telas, ordenações e filtros, compartilhamento em 1 clique.
8. Estética minimalista: cards limpos, hierarquia clara entre preço e nome.
9. Recuperação de erros: estado "nenhum resultado" com opção de limpar os filtros, página 404, fallback de localização.
10. Ajuda e documentação: página "Sobre nós" e tutorial no perfil.

## 8. Processo de UX (técnicas)
Desk research → proto-persona → matriz CSD → benchmarking → questionário com usuários → personas → mapa de empatia → jornada → needs statement → grid de priorização → protótipo de baixa fidelidade → análise heurística de concorrente → teste de usabilidade (3 usuários, 4 tarefas, escala de dificuldade de 1 a 5) → UX writing → visual design (Inter, #162C9A, #FFD027) → protótipo de alta fidelidade → prompt engineering → MVP funcional.

## 9. Limitações e próximos passos
- Preços simulados; o próximo passo é integrar uma fonte real (API ou scraper em backend próprio).
- Dados ficam no navegador do usuário; para sincronizar entre dispositivos e ter login, usar o Supabase.
- Lista compartilhada é uma cópia estática (não colaborativa em tempo real).
- Ampliar a cobertura de testes e validar o MVP com um novo teste de usabilidade.
