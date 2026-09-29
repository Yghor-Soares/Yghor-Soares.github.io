# Yghor Santos | Portfólio

Portfólio pessoal de Yghor Santos, desenvolvido com React, TypeScript e Vite.

## Desenvolvimento local

```bash
npm ci
npm run dev
```

Verificações de qualidade e build:

```bash
npm run lint
npm run build
```

## Currículo

O PDF publicado fica em `public/cv/Yghor_Santos_Curriculo.pdf`. Para recriá-lo depois de atualizar os dados ou a foto:

```bash
npm run cv:generate
```

## GitHub Pages

O deploy é executado automaticamente pelo workflow em `.github/workflows/deploy.yml` quando há um push para `main`.

Para publicar como site pessoal, crie o repositório público `Yghor-Soares.github.io`, envie o projeto para a branch `main` e, em **Settings > Pages**, selecione **GitHub Actions** como fonte de publicação. O site ficará disponível em `https://yghor-soares.github.io/` após a conclusão do workflow.