# Contributing to ATS Self-Service Platform

Thank you for your interest in contributing to the ATS Self-Service Platform!

## Development Setup

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Docker >= 24.0.0
- Docker Compose >= 2.20.0

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-org/ats-self-service.git
cd ats-self-service
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

4. Start Docker services:
```bash
pnpm docker:up
```

5. Run database migrations:
```bash
pnpm --filter @ats/api prisma:migrate
```

6. Start development servers:
```bash
pnpm dev
```

## Project Structure

- `apps/web` - Next.js frontend application
- `apps/api` - Fastify backend API
- `packages/ui` - Shared UI components
- `packages/types` - Shared TypeScript types
- `packages/utils` - Shared utility functions
- `packages/config` - Shared configuration files

## Development Workflow

### Creating a New Feature

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes

3. Write tests for your changes

4. Run tests:
```bash
pnpm test
```

5. Run linter:
```bash
pnpm lint
```

6. Commit your changes:
```bash
git commit -m "feat: your feature description"
```

7. Push to your branch:
```bash
git push origin feature/your-feature-name
```

8. Create a Pull Request

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Testing

- Write unit tests for all new functions
- Write integration tests for API endpoints
- Write component tests for React components
- Aim for 80%+ code coverage

Run tests:
```bash
# All tests
pnpm test

# With coverage
pnpm test:coverage

# Watch mode
pnpm --filter @ats/web test:watch
```

### Storybook

Use Storybook for developing UI components:

```bash
pnpm storybook
```

Create stories for all new components.

### Code Style

- Use TypeScript for all new code
- Follow existing code style
- Use Prettier for formatting
- Use ESLint for linting

Format code:
```bash
pnpm format
```

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Add screenshots for UI changes
4. Link related issues
5. Request review from maintainers

## Questions?

Feel free to open an issue for any questions or concerns.
