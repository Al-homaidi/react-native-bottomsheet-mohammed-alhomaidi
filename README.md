# React Native BottomSheet - Mohammed Al-Homaidi

<div align="center">

![React Native](https://img.shields.io/badge/React%20Native-0.60+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg)
![Downloads](https://img.shields.io/npm/dm/react-native-bottomsheet-mohammed-alhomaidi.svg)

**Advanced React Native BottomSheet Component with Context-based API, Multiple Sheets Support & Modern Design**

*Built with ❤️ by Mohammed Mahfouz Al-homaidi*

[Installation](#-installation) • [Quick Start](#-quick-start) • [API Reference](#-api-reference) • [Examples](#-examples) • [Multiple Sheets](#multiple-sheets) • [Troubleshooting](#troubleshooting)

</div>

---

## ✨ Features

- 🎯 **Context-based API**: Easy-to-use hook-based approach
- 🔄 **Multiple Sheets Support**: Open multiple bottom sheets simultaneously
- 🎨 **Smooth Animations**: Fluid animations powered by React Native Reanimated
- 📱 **Responsive Design**: Adapts to different screen sizes and orientations
- 🔧 **TypeScript Ready**: Full TypeScript support with comprehensive type definitions
- 🎪 **Component-based Content**: Use separate components as content for better organization
- 🚀 **Performance Optimized**: Efficient rendering and memory management
- 🎨 **Highly Customizable**: Easy to customize colors, styles, and behavior
- 📐 **Multiple Snap Points**: Support for different snap positions and expanded states
- 🔄 **Backdrop Integration**: Built-in backdrop with customizable opacity and colors
- ✋ **Draggable Line**: Users can drag the top line to expand or collapse the bottom sheet interactively


## 🚀 Installation

### Prerequisites

Make sure you have the following dependencies installed in your React Native project:

```bash
npm install react-native-gesture-handler react-native-reanimated react-native-safe-area-context
```

### Install the Package

```bash
npm install react-native-bottomsheet-mohammed-alhomaidi
```

or

```bash
yarn add react-native-bottomsheet-mohammed-alhomaidi
```

### ⚠️ CRITICAL: GestureHandlerRootView Setup

**You MUST wrap your app with `GestureHandlerRootView` for gestures to work properly:**

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider } from 'react-native-bottomsheet-mohammed-alhomaidi';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        {/* Your app content */}
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}
```


**Without this wrapper, gestures will not work!**

## 🎯 Quick Start

### Basic Usage with Separate Components

```tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider, useBottomSheet } from 'react-native-bottomsheet-mohammed-alhomaidi';

// Separate component for content
const MyContent = () => {
  const { close } = useBottomSheet();
  
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 15 }}>Hello from BottomSheet!</Text>
      <TouchableOpacity 
        onPress={close}
        style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

function App() {
  const { show } = useBottomSheet();

  const BottomeSheetOpen = () => {
    show({
      snapTo: "40%",
      content: (<MyContent />),
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={BottomeSheetOpen}>
            <Text>Open Bottom Sheet</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}

export default App;
```

## 🔄 Multiple Sheets Support

**You can open multiple bottom sheets simultaneously!** Each sheet has its own ID and can be controlled independently.

### Multiple Sheets Example

```tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider, useBottomSheet } from 'react-native-bottomsheet-mohammed-alhomaidi';

// First sheet content
const FirstSheetContent = () => {
  const { close, show } = useBottomSheet();
  
  const openSecondSheet = () => {
    show({
      snapTo: "60%",
      content: (<SecondSheetContent />),
    });
  };
  
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 15 }}>First Bottom Sheet</Text>
      <TouchableOpacity 
        onPress={openSecondSheet}
        style={{ backgroundColor: '#28a745', padding: 10, borderRadius: 5, marginBottom: 10 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Open Second Sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={close}
        style={{ backgroundColor: '#dc3545', padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

// Second sheet content
const SecondSheetContent = () => {
  const { close, expandToFull } = useBottomSheet();
  
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 15 }}>Second Bottom Sheet</Text>
      <TouchableOpacity 
        onPress={() => expandToFull()}
        style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 5, marginBottom: 10 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Expand to Full</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={close}
        style={{ backgroundColor: '#dc3545', padding: 10, borderRadius: 5 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

function MultipleSheetsExample() {
  const { show } = useBottomSheet();

  const openFirstSheet = () => {
    show({
      snapTo: "40%",
      content: (<FirstSheetContent />),
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={openFirstSheet}>
            <Text>Open Multiple Sheets</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}
```

### Advanced Multiple Sheets with IDs

```tsx
const { show, close, expandToFull } = useBottomSheet();

// Open multiple sheets with different configurations
const openSettingsSheet = () => {
  show({
    snapTo: "50%",
    backgroundColor: "#f8f9fa",
    content: (<SettingsContent />),
  });
};

const openProfileSheet = () => {
  show({
    snapTo: "70%",
    backgroundColor: "#fff",
    content: (<ProfileContent />),
  });
};

// Close specific sheet
// close();

// Expand specific sheet to full screen
// expandToFull();
```

### BottomSheetProvider

Context provider that manages multiple bottom sheets in your application.

```tsx
import { BottomSheetProvider } from 'react-native-bottomsheet-mohammed-alhomaidi';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        {/* Your app content */}
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}
```

### useBottomSheet Hook

Hook that provides methods to control bottom sheets from anywhere in your app.

```tsx
const { show, close, expandToFull } = useBottomSheet();
```

#### Methods

- **`show(sheetProps)`**: Shows a new bottom sheet
- **`close()`**: Closes the last bottom sheet
- **`expandToFull()`**:

### BottomSheet Configuration

Configuration object passed to the `show()` method.

#### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `snapTo` | `string` | Required | Initial snap position (e.g., "40%", "200px") |
| `snapToExpanded` | `string` | - | Expanded snap position for drag-to-expand |
| `expandToFull` | `boolean` | `false` | Whether to expand to full screen initially |
| `backgroundColor` | `string` | `"#fff"` | Background color of the sheet |
| `DropbackgroundColor` | `string` | `"rgba(0,0,0,0.9)"` | Backdrop color |
| `content` | `React.ReactNode` | Required | Content to display in the sheet |
| `containerStyle` | `StyleProp<ViewStyle>` | - | Custom container styles |
| `lineContainerStyle` | `StyleProp<ViewStyle>` | - | Custom line container styles |
| `lineStyle` | `StyleProp<ViewStyle>` | - | Custom line styles |
| `containerClassName` | `string` | - | CSS class name for container |
| `lineContainerClassName` | `string` | - | CSS class name for line container |
| `lineClassName` | `string` | - | CSS class name for line |
| `zIndex` | `number` | `100 + index` | Z-index of the sheet (auto-incremented) |

## 🎨 Examples

### Comprehensive Example - Using All Properties

```tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider, useBottomSheet } from 'react-native-bottomsheet-mohammed-alhomaidi';

// Comprehensive content component using all available properties
const ComprehensiveContent = () => {
  const { close, expandToFull } = useBottomSheet();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        Comprehensive Settings
      </Text>
      
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>Notifications</Text>
        <Switch 
          value={notifications} 
          onValueChange={setNotifications}
        />
      </View>
      
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>Dark Mode</Text>
        <Switch 
          value={darkMode} 
          onValueChange={setDarkMode}
        />
      </View>

      <TouchableOpacity 
        onPress={() => expandToFull()}
        style={{ backgroundColor: '#007AFF', padding: 12, borderRadius: 8, marginBottom: 10 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Expand to Full Screen</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={{ backgroundColor: '#dc3545', padding: 12, borderRadius: 8 }}
        onPress={close}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          Close
        </Text>
      </TouchableOpacity>
    </View>
  );
};

function ComprehensiveExample() {
  const { show } = useBottomSheet();

  const openComprehensiveSheet = () => {
    show({
      // Required properties
      snapTo: '50%',
      content: (<ComprehensiveContent />),
      
      // Optional properties - using all available ones
      snapToExpanded: '85%',
      expandToFull: false,
      backgroundColor: '#f8f9fa',
      DropbackgroundColor: 'rgba(0,0,0,0.4)',
      zIndex: 150,
      
      // Custom styles
      containerStyle: {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
      },
      lineContainerStyle: {
        paddingVertical: 10,
        backgroundColor: 'rgba(0,0,0,0.05)',
      },
      lineStyle: {
        backgroundColor: '#007AFF',
        width: 80,
        height: 6,
        borderRadius: 3,
      },
      
      // CSS class names (if using NativeWind or similar)
      containerClassName: 'custom-container',
      lineContainerClassName: 'custom-line-container',
      lineClassName: 'custom-line',
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={openComprehensiveSheet}>
            <Text>Open Comprehensive Sheet</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}
```

### TextInput with Auto-Expand on Focus

```tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider, useBottomSheet } from 'react-native-bottomsheet-mohammed-alhomaidi';

// Content component with TextInput that expands on focus
const FormContent = () => {
  const { close, expandToFull } = useBottomSheet();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleInputFocus = () => {
    // Expand to full screen when input is focused
    expandToFull();
  };

  const handleSubmit = () => {
    console.log('Form submitted:', { name, email, message });
    Keyboard.dismiss();
    close();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        Contact Form
      </Text>
      
      <TextInput
        style={{ 
          borderWidth: 1, 
          borderColor: '#ddd', 
          padding: 12, 
          borderRadius: 8, 
          marginBottom: 15,
          backgroundColor: '#fff'
        }}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        onFocus={handleInputFocus}
      />
      
      <TextInput
        style={{ 
          borderWidth: 1, 
          borderColor: '#ddd', 
          padding: 12, 
          borderRadius: 8, 
          marginBottom: 15,
          backgroundColor: '#fff'
        }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        onFocus={handleInputFocus}
      />
      
      <TextInput
        style={{ 
          borderWidth: 1, 
          borderColor: '#ddd', 
          padding: 12, 
          borderRadius: 8, 
          marginBottom: 20,
          height: 100,
          textAlignVertical: 'top',
          backgroundColor: '#fff'
        }}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
        onFocus={handleInputFocus}
      />
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity 
          style={{ backgroundColor: '#6c757d', padding: 12, borderRadius: 8, flex: 1, marginRight: 10 }}
          onPress={close}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={{ backgroundColor: '#007AFF', padding: 12, borderRadius: 8, flex: 1 }}
          onPress={handleSubmit}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function FormWithAutoExpandExample() {
  const { show } = useBottomSheet();

  const openFormSheet = () => {
    show({
      snapTo: '40%',
      snapToExpanded: '90%',
      backgroundColor: '#fff',
      DropbackgroundColor: 'rgba(0,0,0,0.5)',
      content: (<FormContent />),
      
      // Custom styles for better form appearance
      containerStyle: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      lineStyle: {
        backgroundColor: '#007AFF',
        width: 60,
        height: 4,
        borderRadius: 2,
      },
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={openFormSheet}>
            <Text>Open Form with Auto-Expand</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}
```

### Custom Styled Bottom Sheet

```tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider, useBottomSheet } from 'react-native-bottomsheet-mohammed-alhomaidi';

// Custom styled content
const CustomStyledContent = () => {
  const { close } = useBottomSheet();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#fff' }}>
        Custom Styled Sheet
      </Text>
      
      <View style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: 15, borderRadius: 10, marginBottom: 15 }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>This sheet uses custom styling</Text>
      </View>
      
      <TouchableOpacity 
        style={{ backgroundColor: '#ff6b6b', padding: 12, borderRadius: 8 }}
        onPress={close}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          Close
        </Text>
      </TouchableOpacity>
    </View>
  );
};

function CustomStyledExample() {
  const { show } = useBottomSheet();

  const openCustomStyledSheet = () => {
    show({
      snapTo: '60%',
      snapToExpanded: '85%',
      backgroundColor: '#2c3e50', // Dark background
      DropbackgroundColor: 'rgba(0,0,0,0.7)',
      content: (<CustomStyledContent />),
      
      // Custom container styling
      containerStyle: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 15,
      },
      
      // Custom line container styling
      lineContainerStyle: {
        paddingVertical: 15,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      },
      
      // Custom line styling
      lineStyle: {
        backgroundColor: '#e74c3c',
        width: 100,
        height: 8,
        borderRadius: 4,
      },
      
      // Custom z-index
      zIndex: 200,
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={openCustomStyledSheet}>
            <Text>Open Custom Styled Sheet</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}
```

### Settings Bottom Sheet

```tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider, useBottomSheet } from 'react-native-bottomsheet-mohammed-alhomaidi';

// Separate component for settings content
const SettingsContent = () => {
  const { close } = useBottomSheet();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        Settings
      </Text>
      
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>Notifications</Text>
        <Switch 
          value={notifications} 
          onValueChange={setNotifications}
        />
      </View>
      
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>Dark Mode</Text>
        <Switch 
          value={darkMode} 
          onValueChange={setDarkMode}
        />
      </View>
      
      <TouchableOpacity 
        style={{ backgroundColor: '#dc3545', padding: 12, borderRadius: 8, marginTop: 20 }}
        onPress={close}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

function SettingsExample() {
  const { show } = useBottomSheet();

  const BottomeSheetOpen = () => {
    show({
      snapTo: '60%',
      snapToExpanded: '90%',
      backgroundColor: '#f8f9fa',
      DropbackgroundColor: 'rgba(0,0,0,0.3)',
      content: (<SettingsContent />),
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={BottomeSheetOpen}>
            <Text>Open Settings</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}
```

### Action Sheet

```tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider, useBottomSheet } from 'react-native-bottomsheet-mohammed-alhomaidi';

// Separate component for action sheet content
const ActionSheetContent = () => {
  const { close } = useBottomSheet();

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity 
        style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}
        onPress={() => {
          console.log('Camera selected');
          close();
        }}
      >
        <Text style={{ fontSize: 16 }}>📷 Take Photo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}
        onPress={() => {
          console.log('Gallery selected');
          close();
        }}
      >
        <Text style={{ fontSize: 16 }}>🖼️ Choose from Gallery</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={{ padding: 15 }}
        onPress={close}
      >
        <Text style={{ fontSize: 16, color: '#dc3545' }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

function ActionSheetExample() {
  const { show } = useBottomSheet();

  const BottomeSheetOpen = () => {
    show({
      snapTo: '30%',
      backgroundColor: '#fff',
      DropbackgroundColor: 'rgba(0,0,0,0.4)',
      content: (<ActionSheetContent />),
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={BottomeSheetOpen}>
            <Text>Open Action Sheet</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}
```

### Form Bottom Sheet

```tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider, useBottomSheet } from 'react-native-bottomsheet-mohammed-alhomaidi';

// Separate component for form content
const ContactFormContent = () => {
  const { close } = useBottomSheet();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log('Form submitted:', { name, email, message });
    close();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        Contact Form
      </Text>
      
      <TextInput
        style={{ 
          borderWidth: 1, 
          borderColor: '#ddd', 
          padding: 12, 
          borderRadius: 8, 
          marginBottom: 15 
        }}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={{ 
          borderWidth: 1, 
          borderColor: '#ddd', 
          padding: 12, 
          borderRadius: 8, 
          marginBottom: 15 
        }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TextInput
        style={{ 
          borderWidth: 1, 
          borderColor: '#ddd', 
          padding: 12, 
          borderRadius: 8, 
          marginBottom: 20,
          height: 100,
          textAlignVertical: 'top'
        }}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity 
          style={{ backgroundColor: '#6c757d', padding: 12, borderRadius: 8, flex: 1, marginRight: 10 }}
          onPress={close}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={{ backgroundColor: '#007AFF', padding: 12, borderRadius: 8, flex: 1 }}
          onPress={handleSubmit}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function FormBottomSheet() {
  const { show } = useBottomSheet();

  const BottomeSheetOpen = () => {
    show({
      snapTo: '70%',
      snapToExpanded: '90%',
      backgroundColor: '#fff',
      DropbackgroundColor: 'rgba(0,0,0,0.5)',
      content: (<ContactFormContent />),
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={BottomeSheetOpen}>
            <Text>Open Contact Form</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Gestures not working**: Ensure `GestureHandlerRootView` wraps your app
2. **Animations not smooth**: Check `react-native-reanimated` installation
3. **Safe area issues**: Verify `react-native-safe-area-context` setup
4. **Import errors**: Check import order and dependencies

### Common Solutions

```tsx
// ✅ Correct setup
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider, useBottomSheet } from 'react-native-bottomsheet-mohammed-alhomaidi';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetProvider>
        {/* Your app */}
      </BottomSheetProvider>
    </GestureHandlerRootView>
  );
}
```

### Best Practices

1. **Use `useCallback` for content functions** to prevent unnecessary re-renders
2. **Minimize content complexity** in the bottom sheet for better performance
3. **Use `snapToExpanded`** for better user experience with long content
4. **Avoid heavy computations** in the content component
5. **Always use separate components** for content for better organization
6. **Test on both iOS and Android** to ensure consistent behavior

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Al-homaidi/bottomsheet-mohammed-al-homaidi.git

# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test
```

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohammed Mahfouz Al-homaidi**

- GitHub: [@Al-homaidi](https://github.com/Al-homaidi)
- LinkedIn: [Mohammed Mahfouz Al-homaidi](https://www.linkedin.com/in/mohammed-mahfouz-al-homaidi-1876b631b/)
- Email: [alhomaidi505@gmail.com](mailto:alhomaidi505@gmail.com)
- Portfolio: [Portfolio](https://portfolio-mohammed-mahfouzs-projects.vercel.app/)

---

## 🔮 Roadmap

Future enhancements include:

- 🎭 **Modal Component**: Advanced modal with backdrop blur and animations
- 🔔 **Toast Notifications**: Elegant toast message system
- 🗂️ **Drawer Navigation**: Side drawer with gesture support
- 🎠 **Carousel**: Image and content carousel component
- 📑 **Tab Navigation**: Customizable tab navigation
- 🎨 **Theme System**: Comprehensive theming and customization
- 📱 **Platform Specific**: iOS and Android specific optimizations
- 🌙 **Dark Mode**: Built-in dark mode support
- 📊 **Analytics**: Usage analytics and performance metrics

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ for the React Native community

[Report Bug](https://github.com/Al-homaidi/bottomsheet-mohammed-al-homaidi/issues) • [Request Feature](https://github.com/Al-homaidi/bottomsheet-mohammed-al-homaidi/issues) • [Documentation](https://github.com/Al-homaidi/bottomsheet-mohammed-al-homaidi#readme)

</div> 