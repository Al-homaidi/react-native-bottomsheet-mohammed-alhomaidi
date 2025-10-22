import { StyleProp, ViewStyle } from 'react-native';
import { AnimatedScrollViewProps } from 'react-native-reanimated';

export interface AnimationConfig {
    duration?: number;
    damping?: number;
    stiffness?: number;
    mass?: number;
}

export interface BottomSheetProps extends AnimatedScrollViewProps {
    snapTo: string;
    DropbackgroundColor: string;
    snapToExpanded?: string;
    backgroundColor?: string;
    expandToFull?: boolean;
    content?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    lineContainerStyle?: StyleProp<ViewStyle>;
    lineStyle?: StyleProp<ViewStyle>;
    zIndex?: number;
    animationConfig?: {
        expand?: AnimationConfig;
        close?: AnimationConfig;
        drag?: AnimationConfig;
    };
    enableDragToClose?: boolean;
    enableDragToExpand?: boolean;
    dragThreshold?: number;
    enableBackdropClose?: boolean;
    tapBackdropToClose?: boolean;
    showDragLine?: boolean;
}

export interface BottomSheetMethods {
    expand: () => void;
    close: () => void;
}

export const DEFAULT_ANIMATION_CONFIG = {
    expand: {
        damping: 200,
        stiffness: 400,
        mass: 1,
    },
    close: {
        duration: 200,
    },
    drag: {
        damping: 100,
        stiffness: 400,
        mass: 1,
    },
};

export const DEFAULT_BEHAVIOR_CONFIG = {
    enableDragToClose: true,
    enableDragToExpand: true,
    dragThreshold: 30,
    tapBackdropToClose: true,
    showDragLine: true,
    enableNativeDriver: true,
    enableBackdropClose: true
};
