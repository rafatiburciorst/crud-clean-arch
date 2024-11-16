### Project Structure

src/
├── core/                   # Regras de negócio puras
│   ├── entities/           # Entidades do domínio
│   │   ├── BaseEntity.ts
│   │   ├── Person.ts
│   ├── value-objects/      # Value Objects usados pelas entidades
│   │   ├── UniqueEntityID.ts
│   └── exceptions/         # Exceções específicas do domínio
│       ├── DomainException.ts
│
├── application/            # Casos de uso e interfaces
│   ├── use-cases/          # Casos de uso
│   │   ├── CreatePersonUseCase.ts
│   ├── repositories/       # Interfaces de repositórios
│   │   ├── PersonRepository.ts
│   ├── exceptions/         # Exceções da aplicação (opcional)
│       ├── ApplicationException.ts
│
├── infrastructure/         # Implementações específicas
│   ├── repositories/       # Implementações dos repositórios
│   │   ├── InMemoryPersonRepository.ts
│   │   ├── PostgreSQLPersonRepository.ts
│   ├── database/           # Configuração do banco de dados
│   │   ├── prismaClient.ts
│   │   └── migrations/     # (opcional) Scripts de migração
│   ├── config/             # Configurações da aplicação
│   │   ├── env.ts
│   │   ├── logger.ts
│
├── interfaces/             # Pontos de entrada e saída
│   ├── http/               # Interface HTTP
│   │   ├── controllers/    # Controladores
│   │   │   ├── CreatePersonController.ts
│   │   ├── routes/         # Rotas HTTP
│   │   │   ├── personRoutes.ts
│   │   └── server.ts       # Configuração do servidor
│
└── tests/                  # Testes
    ├── unit/               # Testes unitários
    │   ├── core/
    │   ├── application/
    ├── integration/        # Testes de integração
    │   ├── http/
    └── e2e/                # Testes ponta-a-ponta