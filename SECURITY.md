# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:
- **Email**: [alhomaidi505@gmail.com](mailto:alhomaidi505@gmail.com)
- **Subject**: `[SECURITY] React Native BottomSheet Vulnerability Report`

### What to Include

Please include the following information in your report:

1. **Description**: A clear description of the vulnerability
2. **Steps to Reproduce**: Detailed steps to reproduce the issue
3. **Impact**: Potential impact of the vulnerability
4. **Environment**: React Native version, platform (iOS/Android), device info
5. **Code Sample**: Minimal code that demonstrates the vulnerability
6. **Suggested Fix**: If you have ideas on how to fix the issue

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution**: As quickly as possible, typically within 30 days

### What to Expect

1. **Confirmation**: We'll confirm receipt of your report within 48 hours
2. **Investigation**: We'll investigate the issue and determine its severity
3. **Fix Development**: We'll develop a fix for the vulnerability
4. **Release**: We'll release a patch version with the fix
5. **Credit**: We'll credit you in the security advisory (if desired)

## Security Best Practices

### For Users

- **Keep Updated**: Always use the latest version of the library
- **Review Code**: Review any custom implementations
- **Test Thoroughly**: Test your implementation on both platforms
- **Follow Guidelines**: Follow React Native security best practices

### For Contributors

- **Code Review**: All code changes go through review
- **Dependency Updates**: Keep dependencies up to date
- **Security Testing**: Test for common vulnerabilities
- **Documentation**: Document any security considerations

## Common Security Considerations

### Input Validation
- Always validate user inputs
- Sanitize data before processing
- Use proper TypeScript types

### Memory Management
- Avoid memory leaks in animations
- Properly clean up event listeners
- Use proper lifecycle management

### Platform Security
- Follow iOS and Android security guidelines
- Use secure communication protocols
- Implement proper error handling

## Security Updates

Security updates will be released as patch versions (e.g., 1.0.1, 1.0.2) and will be announced in:

- GitHub Releases
- NPM package updates
- Security advisories

## Contact

For any security-related questions or concerns, please contact:

- **Email**: [alhomaidi505@gmail.com](mailto:alhomaidi505@gmail.com)
- **GitHub**: [@Al-homaidi](https://github.com/Al-homaidi)

---

**Thank you for helping keep our community safe! 🛡️**
