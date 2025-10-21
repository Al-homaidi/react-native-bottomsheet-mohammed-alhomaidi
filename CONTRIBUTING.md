# Contributing to React Native BottomSheet

Thank you for your interest in contributing to this project! We welcome contributions from the community.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- React Native development environment
- Git

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/bottomsheet-mohammed-al-homaidi.git
cd bottomsheet-mohammed-al-homaidi

# Install dependencies
npm install

# Build the library
npm run build

# Run tests (if available)
npm test
```

## 📋 How to Contribute

### 🐛 Reporting Issues

Before creating an issue, please:

1. **Check existing issues** - Search for similar problems
2. **Use the latest version** - Ensure you're using the most recent release
3. **Provide clear description** - Explain what's happening vs. what should happen
4. **Include reproduction steps** - Step-by-step instructions to reproduce
5. **Add code examples** - Minimal code that demonstrates the issue
6. **Specify environment** - React Native version, platform, device info

Use our [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md) for best results.

### 🔧 Submitting Pull Requests

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following our coding standards
4. **Add tests** if applicable
5. **Update documentation** if needed
6. **Commit with clear messages**: `git commit -m 'Add amazing feature'`
7. **Push to your branch**: `git push origin feature/amazing-feature`
8. **Open a Pull Request** using our template

Use our [Pull Request Template](.github/pull_request_template.md) for best results.

## 🎨 Code Style Guidelines

### TypeScript Standards
- Use TypeScript for all new code
- Define proper interfaces for props
- Use meaningful type names
- Avoid `any` types

### React Native Best Practices
- Follow React Native naming conventions
- Use functional components with hooks
- Implement proper error boundaries
- Optimize for performance

### Code Quality
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Follow DRY principles

### Example Code Style
```tsx
// ✅ Good
interface BottomSheetProps {
  snapTo: string;
  content: React.ReactNode;
  backgroundColor?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ 
  snapTo, 
  content, 
  backgroundColor = '#fff' 
}) => {
  // Implementation
};

// ❌ Bad
const BottomSheet = (props: any) => {
  // Implementation
};
```

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] Test on iOS devices/simulator
- [ ] Test on Android devices/emulator
- [ ] Test different screen sizes
- [ ] Test different orientations
- [ ] Test gesture interactions
- [ ] Verify animations are smooth
- [ ] Test with multiple sheets
- [ ] Test keyboard interactions

### Automated Testing
- Add unit tests for new functions
- Add integration tests for components
- Test edge cases and error conditions
- Ensure backward compatibility

## 📚 Documentation Standards

### README Updates
- Update feature list for new functionality
- Add examples for new props/methods
- Update API reference tables
- Include TypeScript type definitions

### Code Documentation
- Add JSDoc comments for public APIs
- Document complex algorithms
- Include usage examples in comments
- Update type definitions

## 🎯 Types of Contributions

### 🐛 Bug Fixes
- Fix existing issues
- Improve error handling
- Enhance performance
- Fix memory leaks

### ✨ New Features
- Add new props or methods
- Implement new animation types
- Add new customization options
- Enhance gesture support

### 📖 Documentation
- Improve existing documentation
- Add more examples
- Create tutorials or guides
- Translate documentation

### 🧪 Testing
- Add unit tests
- Add integration tests
- Improve test coverage
- Add performance tests

### 🎨 UI/UX Improvements
- Enhance visual design
- Improve animations
- Add accessibility features
- Optimize user experience

## 🔍 Review Process

### What We Look For
- **Code Quality**: Clean, readable, maintainable code
- **Performance**: Efficient implementation
- **Compatibility**: Works across platforms
- **Documentation**: Clear and comprehensive
- **Testing**: Proper test coverage

### Review Timeline
- Initial review: Within 3-5 business days
- Feedback and iterations: As needed
- Final approval: After all requirements met

## ❓ Questions & Support

### Getting Help
1. **Check existing issues** first
2. **Open a question issue** using our template
3. **Join discussions** in existing issues
4. **Contact maintainer**: [alhomaidi505@gmail.com](mailto:alhomaidi505@gmail.com)

### Community Guidelines
- Be respectful and constructive
- Help others learn and grow
- Share knowledge and best practices
- Follow our [Code of Conduct](CODE_OF_CONDUCT.md)

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

**Thank you for contributing! 🙏**

Made with ❤️ by [Mohammed Mahfouz Al-homaidi](https://github.com/Al-homaidi)
