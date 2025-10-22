# Contributing to React Native BottomSheet

Thank you for your interest in contributing to React Native BottomSheet! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0
- React Native development environment
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/bottomsheet-mohammed-al-homaidi.git
   cd bottomsheet-mohammed-al-homaidi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

## 📝 Code Style

### TypeScript
- Use TypeScript for all new code
- Follow existing type definitions in `src/BottomSheetTypes.ts`
- Add proper type annotations for all functions and variables

### Code Formatting
- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Use meaningful variable and function names
- Add comments for complex logic

### File Structure
```
src/
├── BottomSheet.tsx          # Main component
├── BottomSheetContext.tsx   # Context provider
├── BottomSheetTypes.ts      # Type definitions
├── BackDrop.tsx            # Backdrop component
└── index.ts                # Public exports
```

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment Information**
   - React Native version
   - Platform (iOS/Android)
   - Device/Simulator details

2. **Steps to Reproduce**
   - Clear, numbered steps
   - Minimal code example if possible

3. **Expected vs Actual Behavior**
   - What you expected to happen
   - What actually happened

4. **Additional Context**
   - Screenshots or videos if helpful
   - Console logs or error messages

## ✨ Feature Requests

When requesting features:

1. **Describe the feature clearly**
   - What problem does it solve?
   - How would it work?

2. **Provide use cases**
   - Real-world scenarios where this would be useful
   - Examples of how you'd use it

3. **Consider implementation**
   - Any thoughts on how it might be implemented
   - Potential impact on existing API

## 🔧 Pull Request Process

### Before Submitting

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the code style guidelines
   - Add tests if applicable
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```

### Commit Message Format

Use conventional commit format:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Pull Request Guidelines

1. **Title**: Clear, descriptive title
2. **Description**: Explain what changes you made and why
3. **Testing**: Describe how you tested your changes
4. **Breaking Changes**: Note any breaking changes
5. **Related Issues**: Link to any related issues

## 🧪 Testing

### Manual Testing

Test your changes on both platforms:

1. **iOS Testing**
   - Test on iOS Simulator
   - Test on physical device if possible

2. **Android Testing**
   - Test on Android Emulator
   - Test on physical device if possible

### Test Cases to Consider

- Basic show/hide functionality
- Drag gestures (close/expand)
- Multiple bottom sheets
- Keyboard interactions
- Safe area handling
- Custom styling
- Animation performance

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Document complex algorithms or logic
- Keep comments up-to-date with code changes

### README Updates

- Update examples if API changes
- Add new features to the features list
- Update installation instructions if needed

## 🎯 Areas for Contribution

### High Priority
- Performance optimizations
- Accessibility improvements
- Additional animation options
- Better TypeScript support

### Medium Priority
- More customization options
- Additional gesture support
- Platform-specific optimizations
- Documentation improvements

### Low Priority
- Additional examples
- Code style improvements
- Minor bug fixes

## 🤝 Community Guidelines

### Be Respectful
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Focus on what is best for the community

### Be Constructive
- Provide helpful feedback
- Suggest improvements rather than just pointing out problems
- Help others learn and grow

### Be Patient
- Remember that maintainers are volunteers
- Allow time for responses and reviews
- Be understanding of different time zones and schedules

## 📞 Getting Help

If you need help:

1. **Check existing issues** - Your question might already be answered
2. **Search documentation** - Look through README and code comments
3. **Create an issue** - Use the question template for general questions
4. **Join discussions** - Participate in issue discussions

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributors list

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to React Native BottomSheet! 🎉