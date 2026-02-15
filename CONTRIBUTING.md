# Contributing to Nexus

Thank you for your interest in contributing to Nexus! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## Getting Started

### 1. Fork the Repository

```bash
git clone https://github.com/Muideen7/nexus.git
cd nexus
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/add-notifications`
- `fix/auth-bug`
- `docs/update-readme`

### 3. Make Your Changes

- Follow the existing code style
- Write clear, descriptive commit messages
- Keep commits atomic and focused
- Add comments for complex logic

### 4. Test Your Changes

```bash
npm run lint
npm run type-check
npm run build
```

### 5. Commit and Push

```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

- Provide a clear description of changes
- Reference related issues
- Include screenshots for UI changes
- Ensure all checks pass

## Commit Message Format

Follow conventional commits:

```
type(scope): subject

body

footer
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions
- `chore`: Build/dependency updates

Example:
```
feat(auth): add password reset functionality

- Add forgot-password page
- Create reset password API route
- Add email notification

Closes #123
```

## Code Style

### TypeScript
- Use strict mode
- Add type annotations
- Avoid `any` type
- Use interfaces for objects

### React
- Use functional components
- Use hooks for state management
- Keep components focused
- Extract reusable components

### Styling
- Use Tailwind CSS classes
- Follow existing color scheme
- Maintain responsive design
- Test on mobile devices

## File Structure

```
components/
├── auth/           # Authentication components
├── layout/         # Layout components
├── sections/       # Page sections
├── ui/             # Reusable UI components
└── providers/      # Context providers

lib/
├── auth.ts         # Authentication logic
├── email.ts        # Email service
└── prisma.ts       # Database client

app/
├── (auth)/         # Auth routes
├── (main)/         # Main routes
├── api/            # API routes
└── dashboard/      # Dashboard routes
```

## Testing

- Write tests for new features
- Ensure existing tests pass
- Aim for >80% code coverage
- Test edge cases

## Documentation

- Update README.md for new features
- Add JSDoc comments for functions
- Document API endpoints
- Include usage examples

## Performance

- Optimize images
- Minimize bundle size
- Use code splitting
- Avoid unnecessary re-renders

## Security

- Never commit secrets
- Validate user input
- Use parameterized queries
- Follow OWASP guidelines

## Reporting Issues

### Bug Reports

Include:
- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/videos
- Environment details

### Feature Requests

Include:
- Clear description
- Use case/motivation
- Proposed solution
- Alternative solutions

## Review Process

1. Automated checks run
2. Code review by maintainers
3. Feedback and iterations
4. Approval and merge

## Questions?

- Open an issue for questions
- Check existing issues first
- Join our community discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Nexus! 🚀
