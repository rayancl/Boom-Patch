# Boom Patch

<!-- PAM-CI-NOTA-INICIO -->
### Nota atual (automática) — TRP bentão (campeonatos)

[![CI](https://github.com/rayancl/Boom-Patch/actions/workflows/pam-ci.yml/badge.svg)](https://github.com/rayancl/Boom-Patch/actions/workflows/pam-ci.yml) [![Nota](https://img.shields.io/badge/Nota%20PAM%20I-B-yellow)](https://github.com/rayancl/Boom-Patch/actions/workflows/pam-ci.yml)

**B** — Bom · **55%** (30/55 pontos) · atualizado em 2026-10-06 00:17

| Fase | Pontos |
|------|--------|
| Fase 1 — Estrutura | 9/10 |
| Fase 2 — AsyncStorage | 15/15 |
| Fase 3 — SQLite | 6/30 |

Checklist item a item em [NOTA.md](NOTA.md) · [ver a rodada mais recente no Actions](https://github.com/rayancl/Boom-Patch/actions/workflows/pam-ci.yml)
<!-- PAM-CI-NOTA-FIM -->

Organizador de campeonatos — grupo **TRP bentão**.

> App criado a partir do template Expo (SDK 57) + telas das Fases 1 e 2 pré-configuradas.

## Como rodar

```bash
npm install
npx expo start
```

## O que já está pronto

- **Fase 1** ✅ — Tela de **Lista** (`src/app/index.tsx`, FlatList com campeonatos e selo de status) e tela de **Detalhe** (`src/app/detalhe/[id].tsx`, com os times participantes), navegação via `expo-router`.
- **Fase 2** ✅ — Tela **Adicionar** (`src/app/adicionar.tsx`) com formulário que **salva no AsyncStorage** (`src/lib/storage.ts`). A lista recarrega ao voltar da tela (`useFocusEffect`).
- Dados iniciais em `src/data/campeonatos.ts`.

## Tarefas que faltam (vocês completam)

Procure pelos comentários `// TAREFA (Aula XX):` no código:

1. **Aula 07** — Melhorar a validação do formulário (`src/app/adicionar.tsx`).
2. **Aula 18** — Botão **Editar** e **Excluir** na tela de detalhe, com confirmação via `Alert.alert`.
3. **Ranking** — Guardar a pontuação de cada time e mostrar um ranking ordenado por pontos.
4. **Aula 14/15** — Migrar o armazenamento de **AsyncStorage para SQLite** na Fase 3 (o `expo-sqlite` já está nas dependências).

## Integrantes

- Rayan Costa Luz Lima
- Vinicius Silva
- João Paula