---
name: Question/Support
about: Ask a question or get help with React Native BottomSheet
title: '[QUESTION] '
labels: ['question', 'help-wanted']
assignees: ''

---

## ❓ Question
What would you like to know or what help do you need?

## 📋 Context
Provide context for your question:
- **What are you trying to achieve?** Describe your goal
- **What have you tried so far?** List your attempts
- **What's not working as expected?** Describe the issue
- **Where did you get stuck?** Specific point of confusion

## 📱 Environment Information
- **React Native Version**: [e.g. 0.72.0]
- **Platform**: [iOS/Android/Both]
- **Device**: [e.g. iPhone 14, Samsung Galaxy S23]
- **OS Version**: [e.g. iOS 16.0, Android 13]
- **Package Version**: [e.g. 1.1.0]
- **react-native-gesture-handler**: [e.g. 2.12.0]
- **react-native-reanimated**: [e.g. 3.3.0]
- **react-native-safe-area-context**: [e.g. 4.7.0]

## 💻 Code Sample
```tsx
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider, useBottomSheet } from 'react-native-bottomsheet-mohammed-alhomaidi';

// Your code here
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        <YourComponent />
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}
```

## 🔍 What I've Checked
- [ ] Read the README.md documentation
- [ ] Checked existing issues for similar problems
- [ ] Verified all dependencies are installed correctly
- [ ] Tested on both iOS and Android (if applicable)
- [ ] Checked console for error messages

## 📚 Documentation References
If you found relevant documentation, please share:
- Links to specific sections
- Code examples you referenced
- Any tutorials or guides you followed

## 🎯 Expected Outcome
What would you like to achieve? What should the final result look like?

## 📝 Additional Information
Add any other information that might be helpful:
- **Screenshots**: If applicable, show what you're seeing
- **Error Messages**: Any console errors or warnings
- **Related Issues**: Links to similar issues or discussions
- **Workarounds**: Any temporary solutions you've found
