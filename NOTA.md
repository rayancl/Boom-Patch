> Este arquivo e **gerado automaticamente** pelo CI a cada push na branch `main`.
> Nao edite a mao: o proximo commit do CI sobrescreve. Para ver a rodada no Actions:
> https://github.com/rayancl/Boom-Patch/actions/workflows/pam-ci.yml

## Nota PAM I — TRP bentão (campeonatos)

![](https://img.shields.io/static/v1?label=Nota%20PAM%20I&message=B&color=yellow)

**Nota atual: B** · 55% (30/55 pontos) · rodada de 2026-10-06 00:17:24 · commit `061a172`

Legenda: I = Insuficiente (0–25%) · R = Regular (25–50%) · B = Bom (50–75%) · MB = Muito bom (75–100%)

| Fase | Pontos | Situação |
|---|---|---|
| Fase 1 — Estrutura | 9/10 | em desenvolvimento |
| Fase 2 — AsyncStorage | 15/15 | completa |
| Fase 3 — SQLite | 6/30 | iniciando |

## Checklist validado

### Fase 1 — Estrutura do projeto (9/10 pts)

- [x] **(+1 pts)** README.md existe e fala do projeto/grupo — `README.md`
- [x] **(+1 pts)** Arquivo principal do app existe (src/app/_layout.tsx) — `src/app/_layout.tsx`
- [x] **(+1 pts)** package.json existe com a dependência "expo" — `expo ~57.0.25`
- [x] **(+1 pts)** Existe tela de LISTAGEM — `src/app/index.tsx`
- [x] **(+1 pts)** Existem dados iniciais (seed) em arquivo de dados — `src/data/campeonatos.ts`
- [x] **(+1 pts)** Existe tela de FORMULÁRIO — `src/app/adicionar.tsx`
- [x] **(+1 pts)** Existe tela de DETALHE — `src/app/detalhe/[id].tsx`
- [ ] **(+1 pts)** Dependências importadas existem no package.json (app não quebra ao abrir) — `fs, path, readline, @/lib/storage, @/assets/images/expo-logo.png`
- [x] **(+1 pts)** app.json identifica o app (name/slug preenchidos) — `app.json`
- [x] **(+1 pts)** Projeto tem pelo menos 2 arquivos de tela/código — `2 arquivos de tela`

### Fase 2 — Persistência com AsyncStorage (15/15 pts)

- [x] **(+1 pts)** Dependência async-storage está no package.json — `no package.json`
- [x] **(+1 pts)** Existe import do AsyncStorage no código — `src/lib/storage.ts`
- [x] **(+1 pts)** Storage faz leitura com AsyncStorage.getItem — `src/lib/storage.ts`
- [x] **(+1 pts)** Storage grava com AsyncStorage.setItem — `src/lib/storage.ts`
- [x] **(+1 pts)** Existe função de CARREGAR a lista (carregar/load) — `src/app/detalhe/[id].tsx`
- [x] **(+1 pts)** Existe função de ADICIONAR/CADASTRAR — `src/app/_layout.tsx`
- [x] **(+1 pts)** Existe busca por id (buscar/find/getItem) — `src/app/detalhe/[id].tsx`
- [x] **(+1 pts)** Existe função de EXCLUIR/remover — `src/app/detalhe/[id].tsx`
- [x] **(+1 pts)** Formulário lê entradas com TextInput — `src/app/adicionar.tsx`
- [x] **(+1 pts)** Formulário salva chamando adicionar/salvar — `src/app/adicionar.tsx`
- [x] **(+1 pts)** Lista é alimentada a partir do storage — `src/app/index.tsx`
- [x] **(+1 pts)** Tela de detalhe usa busca/dados do storage — `src/app/detalhe/[id].tsx`
- [x] **(+1 pts)** Exclusão usa confirmação (Alert.alert) — `src/app/detalhe/[id].tsx`
- [x] **(+1 pts)** Dados iniciais/seed são gravados na 1ª execução — `src/lib/storage.ts`
- [x] **(+1 pts)** Formulário valida campos (trim/length/vazio) — `src/app/adicionar.tsx`

### Fase 3 — Banco de dados SQLite (6/30 pts)

- [x] **(+2x2 pts)** Dependência expo-sqlite está no package.json — `no package.json`
- [ ] **(+2x2 pts)** Existe import do expo-sqlite — `—`
- [ ] **(+2x2 pts)** Existe arquivo de banco de dados — `—`
- [ ] **(+2x2 pts)** Cria a tabela com CREATE TABLE IF NOT EXISTS — `—`
- [ ] **(+2x2 pts)** Insere dados com INSERT INTO — `—`
- [x] **(+2x2 pts)** Consulta com SELECT — `src/components/themed-text.tsx`
- [ ] **(+2x2 pts)** Atualiza com UPDATE — `—`
- [ ] **(+2x2 pts)** Exclui com DELETE FROM — `—`
- [ ] **(+2x2 pts)** Usa filtros com WHERE — `—`
- [ ] **(+2x2 pts)** Banco aberto com openDatabaseAsync/openDatabase — `—`
- [ ] **(+2x2 pts)** Tela de lista carrega dados do banco — `src/app/index.tsx`
- [ ] **(+2x2 pts)** Formulário salva no banco (INSERT/runAsync) — `src/app/adicionar.tsx`
- [ ] **(+2x2 pts)** Detalhe busca no banco com WHERE/SELECT — `src/app/detalhe/[id].tsx`
- [x] **(+2x2 pts)** Usa async/await corretamente (mais de 2 await) — `scripts/reset-project.js`
- [ ] **(+2x2 pts)** Banco possui dados iniciais (seed inserido em SQL) — `—`

## Para evoluir a nota

Os itens **desmarcados** acima são exatamente o que falta no projeto. Cada rodada deste CI (a cada push) recalcula e atualiza a nota — o artefato `nota-pam` sempre mostra o valor mais recente.
