# Light Car 🚖

## Tecnologias Utilizadas

- **Backend:**
  - Node.js
  - Fastify
  - Prisma
  - PostgreSQL

- **Frontend:**
  - Next.js
  - TypeScript
  - Tailwind CSS

- **Infraestrutura:**
  - Docker Compose
  - PostgreSQL

## Como Rodar o Projeto

1. Clone o repositório:

   ```bash
   git clone <repo-url>
   cd light-car

## Instruções e Dados para Testes

### IDs dos Clientes Criados (UUID)

| Cliente ID (UUID)                        | Nome do Cliente      |
|------------------------------------------|----------------------|
| `7602cec0-06f3-4802-a931-e789820c1387`   | Cliente 1            |
| `db978fe5-6a8f-41ae-956c-a57817f85cf3`   | Cliente 2            |
| `2d11d4b8-c8fc-49eb-82ba-77ce738b0413`   | Cliente 3            |
| `39a9a9eb-0531-4e99-a1a4-40695eb932af`   | Cliente 4            |
| `7066e0ff-5de5-41eb-8a68-d2ab87581601`   | Cliente 5            |

Esses são os 5 clientes criados na tabela `Customer` com IDs UUID. Eles são usados para testes na rota `confirmRide`, e o cliente será automaticamente criado se não existir ao confirmar uma viagem.
