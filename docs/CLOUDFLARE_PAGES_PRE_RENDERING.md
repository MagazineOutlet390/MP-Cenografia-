# Arquitetura de Renderização, SEO e Deploy no Cloudflare Pages

## 1. Status Atual no Cloudflare Pages
O projeto está configurado como um SPA (Single Page Application) moderno em React + Vite + TypeScript.
- Todas as rotas possuem URLs reais e canônicas gerenciadas pelo `react-router-dom`.
- Cada página atualiza dinamicamente o `<title>`, `<meta name="description">`, OpenGraph, Twitter Cards e dados estruturados JSON-LD via componente unificado `SEO.tsx`.
- O arquivo `/public/_redirects` com a regra `/* /index.html 200` garante que qualquer rota acessada diretamente no Cloudflare Pages seja servida com status HTTP 200.

## 2. Estratégia de Pré-renderização Estática (SSG) para Crawlers
Para entregar HTML com o conteúdo já embutido no primeiro byte (zero dependência de JavaScript para indexadores lentos), recomendamos a ativação do script de pré-renderização estática antes do deploy de produção:

### Opção A: vite-plugin-prerender (Recomendado para Cloudflare Pages)
1. Instale o plugin de pré-renderização:
   ```bash
   npm install -D vite-plugin-prerender
   ```

2. Atualize o `vite.config.ts`:
   ```typescript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import vitePrerender from 'vite-plugin-prerender';
   import path from 'path';

   export default defineConfig({
     plugins: [
       react(),
       vitePrerender({
         staticDir: path.join(__dirname, 'dist'),
         routes: [
           '/',
           '/sobre',
           '/contato',
           '/esculturas-em-fibra-de-vidro',
           '/cenografia-em-fibra-de-vidro',
           '/pecas-sazonais-em-fibra-de-vidro',
           '/pecas-tecnicas-em-fibra-de-vidro',
           '/portfolio',
           '/blog'
         ],
       }),
     ],
   });
   ```

3. No Cloudflare Pages:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`

## 3. Conexão Futura com Sanity CMS
A camada de dados em `/src/lib/content.ts` foi construída com contratos assíncronos (`getPosts`, `getPostBySlug`, `getProjects`, `getProjectBySlug`).
Para ativar o Sanity CMS:
1. `npm install @sanity/client`
2. Configure as credenciais no arquivo `.env` (ex: `VITE_SANITY_PROJECT_ID` e `VITE_SANITY_DATASET`).
3. Em `/src/lib/content.ts`, substitua os retornos dos dados locais por chamadas `client.fetch(...)`.
4. Todos os componentes e templates do site continuarão funcionando sem nenhuma alteração no código da interface.
