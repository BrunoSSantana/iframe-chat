# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/aa531732-0860-428b-a990-d682670a33a2

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/aa531732-0860-428b-a990-d682670a33a2) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/aa531732-0860-428b-a990-d682670a33a2) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Cliente HTTP Centralizado

Este projeto utiliza um cliente HTTP centralizado baseado em Axios para realizar requisições à API. A configuração está em `src/lib/api-client.ts`.

### Configuração

A URL base da API é configurada através da variável de ambiente `VITE_API_URL`. Por padrão, as requisições são feitas para `/api` se a variável não estiver definida.

Crie um arquivo `.env.local` (para desenvolvimento local) com o seguinte conteúdo:

```
VITE_API_URL=http://seu-servidor-api.com
```

### Como Usar

```typescript
import { apiClient } from '@/lib/api-client';

// GET request
const getData = async () => {
  try {
    const response = await apiClient.get<YourResponseType>('/endpoint');
    console.log(response);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// POST request
const createData = async (data: YourDataType) => {
  try {
    const response = await apiClient.post<YourResponseType>('/endpoint', data);
    return response;
  } catch (error) {
    console.error('Error creating data:', error);
  }
};
```

### Personalização

Para casos especiais onde você precise de uma configuração diferente, é possível criar uma instância personalizada:

```typescript
import ApiClient from '@/lib/api-client';

const customClient = new ApiClient({
  baseURL: 'https://another-api.com',
  timeout: 5000
});

const result = await customClient.get('/custom-endpoint');
```
