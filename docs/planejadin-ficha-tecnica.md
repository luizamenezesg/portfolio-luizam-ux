# PlanejaDin — Ficha técnica para o portfólio

## Em uma frase
[MVP em funcionamento](https://cost-powder-53339892.figma.site) · [Protótipo no Figma](https://www.figma.com/proto/JftpPpk6ONr3l2XrQVK38H/PlanejaDin?page-id=57%3A8&node-id=57-191&starting-point-node-id=57%3A191&t=XJN1wavmKtSqNHM9-1) · Pesquisa e protótipo em 2025 (equipe) · MVP em 2026

App mobile de finanças pessoais para quem começa a controlar o dinheiro e abandona: registro rápido, metas, limites por categoria, alertas, relatórios e a Din, uma assistente que responde com base nos dados do usuário. Pesquisa, requisitos e protótipo feitos em um projeto acadêmico em grupo na Fatec Baixada Santista "Rubens Lara", com Luiza Menezes como UX/UI Designer; MVP funcional gerado com IA no Figma Make em 2026 por Luiza Menezes [CONFIRMAR: projeto individual].

## 1. Requisitos
### Requisitos de negócio
- Ajudar o usuário a manter o hábito de registrar, não só permitir o registro.
- Ser mais rápido que a planilha: 55,6% dos respondentes usavam planilha ou anotações, e 60% deles citaram "mais controle sobre os dados".
- Transformar dados em orientação (Din).
- Fora do MVP: investimentos, integração com bancos, sincronização entre dispositivos, backup diário e controle compartilhado para casais.

### Requisitos funcionais
| Requisito | De onde veio | Onde está no MVP |
|---|---|---|
| RF01 Cadastro e login | História de usuário 1 | Cadastro, Login, erro e sucesso |
| RF02 Registrar receitas e despesas | História 2 e "manter registros" (50%) | Registro de Transação |
| RF03 Categorias personalizadas com limite | História 3 e "mais controle sobre os dados" (60%) | Minhas Categorias |
| RF04 Relatórios com gráficos e filtros por período | História 4 | Minhas Finanças |
| RF05 Metas com prazo e progresso | "Planejar a economia" (61%) e proto-personas | Minhas Metas e Definir meta |
| RF06 Alertas de vencimento e de limite | Benchmarking e "organizar contas" (22%) | Meus Alertas |
| RF07 Dicas personalizadas | História 5 e proto-persona Ana | Dicas com a Din |
| RF08 Histórico com filtros e busca | Requisitos (IA + equipe) | Histórico de Transações e Pesquisar |
| RF09 Exportar dados (PDF e Excel) | Requisitos (IA + equipe) | Exportar em Minhas Finanças |
| RF10 Ocultar valores | Regra de privacidade | Ícone de olho no saldo |

### Requisitos não funcionais
- Mobile-first e responsivo.
- Interface intuitiva para quem não entende de finanças.
- Resposta rápida: feedback imediato e skeletons.
- Privacidade: opção de ocultar valores.
- Acessibilidade: contraste AA, foco visível, alvos de toque de 44px, gráficos com resumo em texto.
- Dados persistidos no navegador.
- Código tipado e testado.

### Regras de negócio
- Saldo: receitas − despesas pagas; saldo projetado inclui recorrentes e contas a pagar.
- Limite por categoria: alerta ao atingir 80% e ao passar de 100%, um por faixa por mês.
- Contas a pagar: alerta 3 dias antes do vencimento e no dia.
- Metas: valor mensal necessário = (valor-alvo − acumulado) ÷ meses restantes.
- Recorrência: transações "repetir todo mês" geradas automaticamente.
- Relatórios: comparação com o período anterior de mesmo tamanho.

## 2. Tecnologias
| Camada | Tecnologia | Para quê |
|---|---|---|
| Geração | Figma Make (IA) + prompt engineering | Gerar o app a partir do documento de requisitos |
| Linguagem | TypeScript | Tipagem dos modelos |
| UI | React | Componentes e estado |
| Rotas | React Router | 19 rotas, uma por tela |
| Estilo | Tailwind CSS | Identidade visual do Figma |
| Gráficos | Recharts | Despesas por categoria e evolução do saldo |
| Ícones | Lucide | Ícones da interface |
| Build | Vite | Servidor de desenvolvimento e build |
| Testes | Vitest [CONFIRMAR] | Testes unitários das regras |

## 3. Arquitetura
SPA (single-page application) que roda no navegador, sem servidor próprio. Interface, regras de negócio e dados ficam em camadas separadas (padrões Service e Repository). Estrutura:
- types.ts: modelos.
- data/seed.ts: dados de demonstração.
- services/: saldo, limites e alertas, metas, recorrência, relatórios, exportação, Din.
- services/repository.ts: persistência (localStorage), isolada atrás de load()/save().
- Estado global com Context API.

Navegação: barra inferior com Início, Pesquisar, Transações (Registro, Histórico) e Meu perfil (Metas, Resumo Financeiro, Categorias, Alertas). O botão flutuante da Din aparece em todas as telas.

Telas (19): Boas-vindas, Login, Cadastro, Onboarding, Início, Pesquisar, Transações, Nova transação, Histórico, Minhas Metas, Nova meta, Detalhe da meta, Minhas Categorias, Nova categoria, Meus Alertas, Minhas Finanças (Resumo Financeiro), Din, Meu perfil e 404.

Fluxos (9):
1. Acesso: Boas-vindas → Login (ou conta de demonstração) ou Cadastro → Onboarding → Início.
2. Registrar transação: Início ou Transações → Nova transação, com atalho para criar categoria.
3. Consultar: Transações → Histórico, e a aba Pesquisar.
4. Metas: Perfil, Início ou Onboarding → Minhas Metas → Nova meta ou detalhe da meta.
5. Categorias: Perfil → Minhas Categorias → Nova categoria.
6. Resumo financeiro: Início ou Perfil → Minhas Finanças.
7. Alertas: Início ou Perfil → Meus Alertas → histórico filtrado pela categoria ou Metas.
8. Din: botão flutuante → chat.
9. Perfil: ocultar valores ao abrir, lembrete diário, restaurar dados de demonstração e sair.

As 4 tarefas do teste de navegação estão nos fluxos 2, 4, 6 e 8.

Decisão de arquitetura: como os dados ficam atrás de load()/save(), dá para trocar o localStorage por um banco (ex.: Supabase) sem refazer as telas.

## 4. Dados
- Dados de demonstração gerados a partir do mês atual, para o MVP fazer sentido em qualquer data.
- Conta de demonstração para testar os fluxos.
- Todos os dados ficam no navegador do usuário (localStorage).

## 5. Lógica principal
- Saldo e projeção: receitas − despesas pagas; a projeção soma recorrentes e contas a pagar do mês.
- Faixas de limite: 80% acende o alerta amarelo e 100% o vermelho, uma vez por faixa por mês.
- Valor mensal da meta: (alvo − acumulado) ÷ meses restantes, arredondado para cima.
- Alertas de vencimento: gerados 3 dias antes e no dia; "Lembrar depois" adia 1 dia.
- Din por regras: identifica a intenção da pergunta (gastos, metas, vencimento, economia, saldo) e responde com os dados da usuária. A lógica fica isolada para trocar por um modelo de IA no futuro.
- Exportação: CSV com separador `;` e vírgula decimal (abre direto no Excel em português) e PDF pela impressão do navegador.

## 6. APIs
Nenhuma API paga ou com chave. Usa APIs nativas do navegador:
- Web Storage / localStorage (persistência)
- Intl.NumberFormat (moeda: R$ 1.818,81)
- Web Speech API (microfone na Din, quando o navegador suporta)
- Impressão do navegador (PDF)

## 7. Heurísticas de Nielsen aplicadas
1. Visibilidade do status: skeletons, toasts ("Despesa registrada"), item ativo na barra.
2. Correspondência com o mundo real: "Faltam 30 dias!", "o limite era R$ 215,00".
3. Controle e liberdade: editar e excluir tudo, "Desfazer" no toast, "Lembrar depois".
4. Prevenção de erros: confirmação antes de excluir, validação inline, teclado numérico no valor.
5. Reconhecimento em vez de memorização: últimas categorias no topo, filtros lembrados, sugestões na Din.
6. Flexibilidade e eficiência: registrar pela Home, por Transações ou pela Din.
7. Recuperação de erros: estados vazios com próxima ação, erro de login claro, página 404.
8. Acessibilidade: contraste AA, alvos de 44px, aria-label, cor nunca sozinha (sinal +/− junto).

## 8. Processo de UX (técnicas)
Em equipe (2025): questionário no Google Forms com fluxos condicionais (18 respostas) → análise dos dados → benchmarking (Organizze e Mobills) → 6 proto-personas (hipóteses, não validadas com entrevistas) → histórias de usuário → requisitos com apoio de IA (ChatGPT e Claude, refinados pela equipe) → caso de uso (UML) → wireframe → protótipo de alta fidelidade → teste de navegação com 4 tarefas.

No MVP (2026): documento de requisitos com contexto, identidade visual, 20 telas, regras de negócio, dados de demonstração, arquitetura e critérios de aceite → prompt engineering no Figma Make → revisão tela a tela contra os 4 fluxos do teste → MVP com 19 telas e 9 fluxos.

Identidade visual: verde #237A57, roxo #6B3FA0, verde claro #D6EDE3, lilás #D9C8EC, vermelho #E5484D (só para erro e limite estourado) [CONFIRMAR hex]; Nunito [CONFIRMAR] em títulos e valores, Roboto em textos.

## 9. Limitações e próximos passos
- Os dados ficam no navegador; não há sincronização entre dispositivos.
- Sem login real (conta de demonstração).
- A Din é baseada em regras, não em um modelo de IA.
- O teste de 2025 foi inicial e o MVP ainda não foi testado com usuários.
- Próximos passos: repetir o teste de navegação no MVP com 5 pessoas; login real e sincronização (Supabase); integração com bancos (Open Finance); Din com modelo de IA, mantendo as respostas baseadas nos dados do usuário; gamificação de metas.
