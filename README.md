# Boom Patch

Organizador de campeonatos — grupo **TRP bentão**. (README original `# Boom-Patch` preservado.)

## Como rodar

```bash
npm install
npx expo start
```

## O que já está pronto

- **Fase 1** ✅ — Tela de **Lista** (FlatList com campeonatos) e tela de **Detalhe** (com os times participantes), navegação via `expo-router`.
- **Fase 2** ✅ — Tela **Adicionar** com formulário que **salva no AsyncStorage** (`lib/storage.js`). A lista recarrega ao voltar da tela de adicionar (`useFocusEffect`).
- Campos do tema: nome, modalidade, período, times e local.

## Tarefas que faltam (vocês completam)

Procure pelos comentários `// TAREFA (Aula XX):` no código:

1. **Aula 07** — Melhorar a validação do formulário.
2. **Aula 18** — Botão **Editar** e **Excluir** na tela de detalhe (com confirmação via `Alert.alert`).
3. **Aula 14/15** — Migrar o armazenamento de **AsyncStorage para SQLite** (Fase 3). O `expo-sqlite` já está nas dependências.
4. **Ranking** — Guardar a pontuação de cada time e mostrar um ranking ordenado por pontos.
5. **Aula 18** — Loading e empty state mais caprichados.

## Integrantes

- Rayan Costa Luz Lima
- Vinicius Silva
- João Paula