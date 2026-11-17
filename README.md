# Boom Patch

<!-- PAM-CI-NOTA-INICIO -->
### Nota atual (automática) — TRP bentão (campeonatos)

[![CI](https://github.com/rayancl/Boom-Patch/actions/workflows/pam-ci.yml/badge.svg)](https://github.com/rayancl/Boom-Patch/actions/workflows/pam-ci.yml) [![Nota](https://img.shields.io/badge/Nota%20PAM%20I-MB-green)](https://github.com/rayancl/Boom-Patch/actions/workflows/pam-ci.yml)

**MB** — Muito bom · **100%** (100/100 pontos) · atualizado em 2026-11-17 14:37

| Fase | Pontos |
|------|--------|
| Fase 1 — Estrutura | 10/10 |
| Fase 2 — AsyncStorage | 15/15 |
| Fase 3 — SQLite | 30/30 |
| Fase 4 — Versão Final (UX e Dispositivo) | 45/45 |

Checklist item a item em [NOTA.md](NOTA.md) · [ver a rodada mais recente no Actions](https://github.com/rayancl/Boom-Patch/actions/workflows/pam-ci.yml)
<!-- PAM-CI-NOTA-FIM -->

<!-- PAM-CI-NOTA-INICIO -->
### Nota atual (automática) — TRP bentão (campeonatos)

[![CI](https://github.com/wendelmax/Boom-Patch/actions/workflows/pam-ci.yml/badge.svg)](https://github.com/wendelmax/Boom-Patch/actions/workflows/pam-ci.yml) [![Nota](https://img.shields.io/badge/Nota%20PAM%20I-MB-green)](https://github.com/wendelmax/Boom-Patch/actions/workflows/pam-ci.yml)


## Instalação e execução

### Requisitos
- Node.js instalado.
- Aplicativo Expo Go no celular.

### Como executar
1. Clone o repositório:
   `git clone https://github.com/rayancl/Boom-Patch.git`
2. Entre na pasta:
   `cd Boom-Patch`
3. Instale as dependências:
   `npm install`
4. Inicie o aplicativo:
   `npx expo start`
5. Leia o QR Code utilizando o Expo Go.

### Teste das funcionalidades
- Cadastre um campeonato.
- Consulte os campeonatos cadastrados.
- Edite as informações de um campeonato.
- Exclua um campeonato.
- Teste o preenchimento do local utilizando o GPS do dispositivo.

### Gerar APK
Para gerar uma versão Android instalável, utilize o Expo Application Services (EAS Build), configure o projeto e execute:

`eas build -p android --profile preview`
