declare module 'react-native-gesture-handler' {
    import { ComponentType } from 'react';
    import { ViewStyle } from 'react-native';

    export interface GestureType {
        onBegin: (callback: () => void) => GestureType;
        onUpdate: (callback: (event: { translationY: number }) => void) => GestureType;
        onEnd: (callback: () => void) => GestureType;
    }

    export const Gesture: {
        Pan: () => GestureType;
    };

    export interface GestureDetectorProps {
        gesture: GestureType;
        children: React.ReactNode;
    }

    export const GestureDetector: ComponentType<GestureDetectorProps>;
}

declare module 'react-native-safe-area-context' {
    export interface EdgeInsets {
        top: number;
        right: number;
        bottom: number;
        left: number;
    }

    export const useSafeAreaInsets: () => EdgeInsets;
} 