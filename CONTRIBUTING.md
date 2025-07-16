# How to contribute

We'd love to accept your patches and contributions to this project.

## Contribution process

### Code reviews

All submissions, including submissions by project members, require review. We
use GitHub pull requests for this purpose. Consult
[GitHub Help](https://help.github.com/articles/about-pull-requests/) for more
information on using pull requests.

### Contributor Guide

You may follow these steps to contribute:

1. **Fork the official repository.** This will create a copy of the official repository in your own account.
2. **Sync the branches.** This will ensure that your copy of the repository is up-to-date with the latest changes from the official repository.
3. **Work on your forked repository's feature branch.** This is where you will make your changes to the code.
4. **Commit your updates on your forked repository's feature branch.** This will save your changes to your copy of the repository.
5. **Submit a pull request to the official repository's main branch.** This will request that your changes be merged into the official repository.
6. **Resolve any linting errors.** This will ensure that your changes are formatted correctly.

Here are some additional things to keep in mind during the process:

- **Test your changes.** Before you submit a pull request, make sure that your changes work as expected.
- **Be patient.** It may take some time for your pull request to be reviewed and merged.

## Development Setup

### Prerequisites

- Node.js 14.0.0 or higher
- npm, yarn, or pnpm package manager
- TypeScript 5.3.3 or higher

### Environment Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zai/z-ai-sdk-typescript.git
   cd z-ai-sdk-typescript
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables for testing:**
   ```bash
   export ZAI_BASE_URL=https://api.z.ai/api/paas/v4/  # Default ZAI API endpoint
   export ZAI_API_KEY=your_api_key_here  # Replace with your actual API key
   ```

   > ⚠️ **Note**: Running integration tests will consume a small amount of tokens from your API account.

### Dependencies

This TypeScript SDK uses the following core dependencies:

| Library | Version | Purpose |
|---------|---------|----------|
| axios | ^1.6.7 | HTTP client for API requests |
| jsonwebtoken | ^9.0.2 | JWT token handling |
| typescript | ^5.3.3 | TypeScript compiler |
| tsup | ^8.0.1 | Build tool for TypeScript |
| jest | ^29.0.0 | Testing framework |
| eslint | ^8.57.1 | Code linting |
| prettier | ^3.0.0 | Code formatting |

### Development Scripts

The following npm scripts are available for development:

```bash
# Build the project
npm run build

# Development mode with watch
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check

# Fix both linting and formatting issues
npm run fix
```

### Code Style and Formatting

This project uses ESLint and Prettier to maintain consistent code style:

- **ESLint**: Enforces code quality rules and TypeScript best practices
- **Prettier**: Handles code formatting (indentation, line breaks, etc.)

**Before submitting a PR:**
1. Run `npm run fix` to automatically fix linting and formatting issues
2. Ensure `npm run lint` passes without errors
3. Ensure `npm run format:check` passes

### Testing

#### Unit Tests
Run unit tests that don't require API calls:
```bash
npm test
```

#### Integration Tests
For tests that make actual API calls, set up your API key:
```bash
export ZAI_API_KEY=your.api.key
npm test
```

#### Test Coverage
Generate test coverage reports:
```bash
npm test -- --coverage
```

Coverage reports will be generated in the `coverage/` directory.

### Building

The project uses `tsup` for building:

```bash
# Build for production
npm run build

# Build in development mode with watch
npm run dev
```

This generates:
- CommonJS build: `dist/index.cjs`
- ES Module build: `dist/index.js`
- Type definitions: `dist/index.d.ts` and `dist/index.d.cts`
- Source maps for debugging

### TypeScript Configuration

The project uses strict TypeScript settings:
- Target: ES2020
- Module: ESNext
- Strict mode enabled
- Declaration files generated
- Source maps enabled

### Project Structure

```
src/
├── __tests__/          # Test files
├── resources/          # API resource modules
│   ├── chat.ts        # Chat completions
│   └── ...            # Other API resources
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── client.ts          # Main client class
└── index.ts           # Main entry point
```

### Submitting Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and test them:**
   ```bash
   npm run fix        # Fix linting and formatting
   npm test           # Run tests
   npm run build      # Ensure build works
   ```

3. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to your fork and create a pull request:**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Guidelines

We follow conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Example: `feat: add streaming support for chat completions`

---

Have Fun! 🚀
