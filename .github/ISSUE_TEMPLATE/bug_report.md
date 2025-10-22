---
name: Bug Report
about: Report a bug in React Native BottomSheet
title: '[BUG] '
labels: ['bug', 'needs-triage']
assignees: ''

---

## 🐛 Bug Description
A clear and concise description of what the bug is.

## 🔄 Steps to Reproduce
Steps to reproduce the behavior:
1. Set up the component with '...'
2. Call show() with '...'
3. Perform action '...'
4. See error/unexpected behavior

## ✅ Expected Behavior
A clear and concise description of what you expected to happen.

## ❌ Actual Behavior
A clear and concise description of what actually happened.

## 📱 Environment Information
- **React Native Version**: [e.g. 0.72.0]
- **Platform**: [iOS/Android/Both]
- **Device**: [e.g. iPhone 14, Samsung Galaxy S23]
- **OS Version**: [e.g. iOS 16.0, Android 13]
- **Package Version**: [e.g. 1.1.0]
- **react-native-gesture-handler**: [e.g. 2.12.0]
- **react-native-reanimated**: [e.g. 3.3.0]
- **react-native-safe-area-context**: [e.g. 4.7.0]

## 📋 Minimal Code Sample
```tsx
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider, useBottomSheet } from 'react-native-bottomsheet-mohammed-alhomaidi';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        <HomeScreen />
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}

const HomeScreen = () => {
  const { show } = useBottomSheet();

  const handleShow = () => {
    show({
      snapTo: '50%',
      content: <Text>Test Content</Text>,
      // ... other props that reproduce the bug
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={handleShow}>
        <Text>Show Bottom Sheet</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
```

## 📸 Screenshots/Videos
If applicable, add screenshots or screen recordings to help explain your problem.

## 📝 Additional Context
- **Error Messages**: Any console errors or warnings
- **Performance Impact**: Does this affect performance?
- **Workarounds**: Any temporary solutions you've found?
- **Related Issues**: Links to similar issues if any

## 🔍 Debug Information
If possible, please provide:
- Console logs
- Stack traces
- Network requests (if applicable)
- Memory usage (if relevant)
