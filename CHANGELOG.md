# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive GitHub templates for issues and pull requests
- Enhanced documentation with detailed examples and best practices
- Security policy and vulnerability reporting process
- Contributing guidelines with code style standards
- Multiple platform testing guidelines

### Changed
- Improved README.md with comprehensive API documentation
- Enhanced issue templates with better structure
- Updated pull request template with detailed checklist
- Better organization of examples and use cases

### Fixed
- Documentation consistency across all files
- API examples match actual implementation
- Clear installation and setup instructions

## [1.1.0] - 2024-12-XX

### Added
- **Multiple Bottom Sheets**: Support for displaying multiple bottom sheets simultaneously
- **Enhanced Gesture Support**: Improved drag-to-close and drag-to-expand functionality
- **Custom Animation Configuration**: Fine-grained control over expand, close, and drag animations
- **Backdrop Customization**: Customizable backdrop colors and tap-to-close behavior
- **Safe Area Integration**: Built-in safe area handling for modern devices
- **TypeScript Definitions**: Comprehensive TypeScript support with full type safety
- **Performance Optimizations**: Optimized animations using React Native Reanimated 3

### Features
- `snapTo`: Initial height percentage (e.g., '50%')
- `snapToExpanded`: Expanded height for drag-to-expand functionality
- `expandToFull`: Programmatic full-screen expansion
- `enableDragToClose`: Toggle drag-to-close gesture
- `enableDragToExpand`: Toggle drag-to-expand gesture
- `dragThreshold`: Customizable drag threshold in pixels
- `showDragLine`: Toggle drag indicator line visibility
- `enableBackdropClose`: Toggle backdrop functionality
- `tapBackdropToClose`: Toggle tap-backdrop-to-close behavior
- `backgroundColor`: Custom background colors
- `DropbackgroundColor`: Custom backdrop colors
- `animationConfig`: Custom animation configurations
- `containerStyle`: Custom container styling
- `lineContainerStyle`: Custom line container styling
- `lineStyle`: Custom line styling
- `containerClassName`: CSS class names for container
- `lineContainerClassName`: CSS class names for line container
- `lineClassName`: CSS class names for line
- `zIndex`: Custom z-index management for layering

### API Methods
- `show(options)`: Display a new bottom sheet
- `close(id?)`: Close a specific or last bottom sheet
- `expandToFull(id?)`: Expand a specific or last bottom sheet to full height

### Examples
- Basic usage with context API
- Multiple bottom sheets management
- Custom styling and animations
- Form handling with keyboard interactions
- Advanced gesture configurations

## [1.0.0] - 2024-01-XX

### Added
- Initial release of React Native BottomSheet
- Context-based API with `useBottomSheet` hook
- Basic bottom sheet functionality
- React Native Reanimated integration
- TypeScript support
- Cross-platform compatibility (iOS & Android)

---

## Migration Guide

### From 0.x to 1.0.0
This is the initial release, so no migration is needed.

### From 1.0.0 to 1.1.0
No breaking changes. All existing code will continue to work. New features are additive.

## Support

For questions, issues, or contributions:
- **Issues**: [GitHub Issues](https://github.com/Al-homaidi/bottomsheet-mohammed-al-homaidi/issues)
- **Email**: [alhomaidi505@gmail.com](mailto:alhomaidi505@gmail.com)
- **GitHub**: [@Al-homaidi](https://github.com/Al-homaidi)

---

**Made with ❤️ by Mohammed Mahfouz Al-homaidi**
