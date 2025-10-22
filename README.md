# React Native BottomSheet

A powerful, flexible, and modern React Native BottomSheet component with context-based API, smooth animations, and comprehensive gesture support.

## ✨ Features

- 🎯 **Context-based API** - Easy to use with `useBottomSheet` hook
- 🎨 **Multiple BottomSheets** - Support for multiple bottom sheets simultaneously
- 🎭 **Smooth Animations** - Powered by React Native Reanimated 3
- 👆 **Gesture Support** - Drag to close, expand, and interactive gestures
- 🎛️ **Highly Customizable** - Extensive styling and behavior options
- 📱 **Safe Area Support** - Built-in safe area handling
- 🎪 **Backdrop Support** - Optional backdrop with tap-to-close functionality
- ⚡ **TypeScript** - Full TypeScript support with comprehensive types
- 🎨 **Modern Design** - Beautiful default styling with rounded corners
- 🔧 **Animation Control** - Customizable animation configurations

## 📦 Installation

```bash
npm install react-native-bottomsheet-mohammed-alhomaidi
```

### Peer Dependencies

Make sure you have these dependencies installed:

```bash
npm install react-native-gesture-handler react-native-reanimated react-native-safe-area-context
```

## 🚀 Quick Start

### 1. Setup GestureHandlerRootView

Wrap your app with `GestureHandlerRootView`:

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider } from 'react-native-bottomsheet-mohammed-alhomaidi';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        {/* Your app content */}
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}
```

### 2. Basic Usage

```tsx
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useBottomSheet } from 'react-native-bottomsheet-mohammed-alhomaidi';

export default function HomeScreen() {
  const { show } = useBottomSheet();

  const handleShowBottomSheet = () => {
    show({
      snapTo: '50%',
      snapToExpanded: '70%',
      content: <BottomSheetContent />,
      enableDragToClose: true,
      enableDragToExpand: true,
      showDragLine: true,
      enableBackdropClose: true,
      tapBackdropToClose: true,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={handleShowBottomSheet}>
        <Text>Show Bottom Sheet</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Separate component for better organization
const BottomSheetContent = () => {
  const { close, expandToFull } = useBottomSheet();
  
  return (
    <View style={{ padding: 20 }}>
      <Text>Bottom Sheet Content</Text>
      <TouchableOpacity onPress={() => expandToFull()}>
        <Text>Expand to Full</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => close()}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## 📚 API Reference

### BottomSheetProvider

The context provider that manages bottom sheet state.

```tsx
<BottomSheetProvider>
  {children}
</BottomSheetProvider>
```

### useBottomSheet Hook

Returns an object with the following methods:

#### `show(options)`

Shows a new bottom sheet.

```tsx
const { show } = useBottomSheet();

show({
  snapTo: '50%',                    // Initial height percentage
  snapToExpanded: '70%',            // Expanded height percentage
  content: <YourComponent />,        // Content to display
  enableDragToClose: true,           // Enable drag to close
  enableDragToExpand: true,          // Enable drag to expand
  showDragLine: true,               // Show drag indicator line
  enableBackdropClose: true,        // Enable backdrop
  tapBackdropToClose: true,         // Tap backdrop to close
  backgroundColor: '#fff',          // Background color
  DropbackgroundColor: 'rgba(0,0,0,0.5)', // Backdrop color
  dragThreshold: 30,               // Drag threshold in pixels
  animationConfig: {                // Custom animation config
    expand: { damping: 200, stiffness: 400 },
    close: { duration: 200 },
    drag: { damping: 100, stiffness: 400 }
  }
});
```

#### `close(id?)`

Closes a bottom sheet. If no ID is provided, closes the last opened sheet.

```tsx
const { close } = useBottomSheet();

// Close last sheet
close();

// Close specific sheet
close('sheet-id');
```

#### `expandToFull(id?)`

Expands a bottom sheet to full height. If no ID is provided, expands the last opened sheet.

```tsx
const { expandToFull } = useBottomSheet();

// Expand last sheet
expandToFull();

// Expand specific sheet
expandToFull('sheet-id');
```

## 🎨 Customization Options

### BottomSheetItemType Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `snapTo` | `string` | Required | Initial height percentage (e.g., '50%') |
| `snapToExpanded` | `string` | - | Expanded height percentage |
| `content` | `React.ReactNode` | Required | Content to display |
| `backgroundColor` | `string` | `'#fff'` | Background color |
| `DropbackgroundColor` | `string` | `'rgba(0,0,0,0.9)'` | Backdrop color |
| `enableDragToClose` | `boolean` | `true` | Enable drag to close |
| `enableDragToExpand` | `boolean` | `true` | Enable drag to expand |
| `showDragLine` | `boolean` | `true` | Show drag indicator line |
| `enableBackdropClose` | `boolean` | `true` | Enable backdrop |
| `tapBackdropToClose` | `boolean` | `true` | Tap backdrop to close |
| `dragThreshold` | `number` | `30` | Drag threshold in pixels |
| `zIndex` | `number` | `100 + index` | Z-index for layering |
| `containerStyle` | `StyleProp<ViewStyle>` | - | Custom container styles |
| `lineContainerStyle` | `StyleProp<ViewStyle>` | - | Custom line container styles |
| `lineStyle` | `StyleProp<ViewStyle>` | - | Custom line styles |
| `animationConfig` | `object` | - | Custom animation configuration |

### Animation Configuration

```tsx
animationConfig: {
  expand: {
    damping: 200,      // Spring damping
    stiffness: 400,   // Spring stiffness
    mass: 1           // Spring mass
  },
  close: {
    duration: 200     // Close animation duration
  },
  drag: {
    damping: 100,     // Drag spring damping
    stiffness: 400,   // Drag spring stiffness
    mass: 1          // Drag spring mass
  }
}
```

## 🎯 Advanced Examples

### Multiple Bottom Sheets

```tsx
const MultipleSheetsExample = () => {
  const { show } = useBottomSheet();

  const showFirstSheet = () => {
    show({
      snapTo: '40%',
      content: <FirstSheetContent />,
      backgroundColor: '#f0f0f0',
    });
  };

  const showSecondSheet = () => {
    show({
      snapTo: '60%',
      snapToExpanded: '80%',
      content: <SecondSheetContent />,
      backgroundColor: '#e0e0e0',
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={showFirstSheet}>
        <Text>Show First Sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showSecondSheet}>
        <Text>Show Second Sheet</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### Custom Styling

```tsx
const CustomStyledSheet = () => {
  const { show } = useBottomSheet();

  const showCustomSheet = () => {
    show({
      snapTo: '50%',
      content: <CustomContent />,
      backgroundColor: '#2c3e50',
      DropbackgroundColor: 'rgba(0,0,0,0.7)',
      containerStyle: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
      },
      lineStyle: {
        backgroundColor: '#ecf0f1',
        width: 80,
        height: 6,
        borderRadius: 3,
      },
      animationConfig: {
        expand: { damping: 300, stiffness: 500 },
        close: { duration: 300 },
      }
    });
  };

  return (
    <TouchableOpacity onPress={showCustomSheet}>
      <Text>Show Custom Sheet</Text>
    </TouchableOpacity>
  );
};
```

### Form with Keyboard Handling

```tsx
const FormSheet = () => {
  const { show, expandToFull } = useBottomSheet();

  const showFormSheet = () => {
    show({
      snapTo: '60%',
      snapToExpanded: '90%',
      content: <FormContent />,
      enableDragToExpand: true,
    });
  };

  return (
    <TouchableOpacity onPress={showFormSheet}>
      <Text>Show Form</Text>
    </TouchableOpacity>
  );
};

const FormContent = () => {
  const { expandToFull } = useBottomSheet();

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Name"
        onFocus={() => expandToFull()}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Email"
        onFocus={() => expandToFull()}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TouchableOpacity style={{ backgroundColor: '#3498db', padding: 15 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## 🎨 Best Practices

### 1. Component Organization

❌ **Don't** put complex content directly in the `show` function:

```tsx
// Bad
show({
  content: (
    <View>
      <TextInput style={{...}} />
      <TouchableOpacity onPress={...}>
        <Text>Button</Text>
      </TouchableOpacity>
      {/* More complex content */}
    </View>
  )
});
```

✅ **Do** create separate components:

```tsx
// Good
show({
  content: <MyBottomSheetContent />
});

const MyBottomSheetContent = () => {
  return (
    <View>
      <TextInput style={{...}} />
      <TouchableOpacity onPress={...}>
        <Text>Button</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### 2. Multiple Sheets Management

The component automatically handles multiple sheets with proper z-indexing. The last opened sheet will be on top.

### 3. Animation Performance

For better performance, avoid complex animations in the content components. The bottom sheet animations are optimized using `react-native-reanimated`.

## 🔧 Requirements

- React Native >= 0.63.0
- React >= 16.8.0
- react-native-gesture-handler >= 2.0.0
- react-native-reanimated >= 3.0.0
- react-native-safe-area-context >= 4.0.0

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 🐛 Issues

If you encounter any issues, please file them on the [GitHub Issues](https://github.com/Al-homaidi/bottomsheet-mohammed-al-homaidi/issues) page.

## 👨‍💻 Author

**Mohammed Mahfouz Al-homaidi**
- Email: alhomaidi505@gmail.com
- GitHub: [@Al-homaidi](https://github.com/Al-homaidi)

---

Made with ❤️ for the React Native community
