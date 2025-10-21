
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle
} from 'react';
import { Dimensions, Keyboard, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  AnimatedScrollViewProps,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackDrop from './BackDrop';

interface Props extends AnimatedScrollViewProps {
  snapTo: string;
  snapToExpanded?: string;
  backgroundColor?: string;
  DropbackgroundColor: string;
  expandToFull?: boolean;
  content?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  lineContainerStyle?: StyleProp<ViewStyle>;
  lineStyle?: StyleProp<ViewStyle>;
  containerClassName?: string;
  lineContainerClassName?: string;
  lineClassName?: string;
  zIndex?: number;
}


export interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
}

const BottomSheetScrollView = forwardRef<BottomSheetMethods, Props>(
  ({ snapTo, containerClassName, lineContainerClassName, lineClassName, snapToExpanded, expandToFull, DropbackgroundColor, backgroundColor, zIndex, content, containerStyle, lineStyle, lineContainerStyle }: Props, ref: React.Ref<BottomSheetMethods>) => {
    const inset = useSafeAreaInsets();
    const { height } = Dimensions.get('screen');
    const percentage = parseFloat(snapTo.replace('%', '')) / 100;
    const closeHeight = height;
    const openHeight = height - height * percentage;
    const expandedHeight = snapToExpanded
      ? height - height * (parseFloat(snapToExpanded.replace('%', '')) / 100)
      : openHeight;

    const topAnimation = useSharedValue(closeHeight);
    const opacity = useSharedValue(1);
    const context = useSharedValue(0);

    const CLOSE_THRESHOLD_PIXELS = 30;

    const expand = useCallback(() => {
      'worklet';
      opacity.value = 1;
      if (expandToFull && snapToExpanded) {
        topAnimation.value = withSpring(expandedHeight, {
          damping: 300,
          stiffness: 300,
        });
      } else {
        topAnimation.value = withSpring(openHeight, {
          damping: 300,
          stiffness: 300,
        });
      }
    }, [openHeight, expandedHeight, expandToFull, snapToExpanded, topAnimation, opacity]);

    const close = useCallback(() => {
      'worklet';
      runOnJS(Keyboard.dismiss)();
      opacity.value = withTiming(0, { duration: 300 });
      topAnimation.value = withTiming(closeHeight, { duration: 300 });
    }, [closeHeight, topAnimation, opacity]);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close],
    );

    const animationStyle = useAnimatedStyle(() => ({
      top: topAnimation.value,
      opacity: opacity.value,
    }));

    const pan = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value;
      })
      .onUpdate(event => {
        if (event.translationY < 0) {
          const resistanceFactor = 0.1;
          topAnimation.value = context.value + event.translationY * resistanceFactor;
        } else {
          topAnimation.value = context.value + event.translationY;
        }
      })
      .onEnd(() => {
        const pulledDistance = topAnimation.value - context.value;
        if (pulledDistance > CLOSE_THRESHOLD_PIXELS) {
          opacity.value = withTiming(0, { duration: 300 });
          topAnimation.value = withTiming(closeHeight, { duration: 300 });
        } else if (snapToExpanded && topAnimation.value < context.value) {
          topAnimation.value = withSpring(expandedHeight, {
            damping: 100,
            stiffness: 400,
          });
          opacity.value = 1;
        } else {
          opacity.value = 1;
          topAnimation.value = withSpring(context.value, {
            damping: 100,
            stiffness: 400,
          });
        }
      });

    useEffect(() => {
      if (expandToFull && snapToExpanded) {
        topAnimation.value = withSpring(expandedHeight, {
          damping: 100,
          stiffness: 400,
        });
        opacity.value = 1;
      }
    }, [expandToFull, snapToExpanded, expandedHeight, topAnimation, opacity]);

    return (
      <>
        <BackDrop
          topAnimation={topAnimation}
          backDropColor={DropbackgroundColor}
          closeHeight={closeHeight}
          openHeight={openHeight}
          close={close}
        />
        <Animated.View
          style={[
            styles.container,
            animationStyle,
            { zIndex: zIndex ?? 100, paddingBottom: inset.bottom, overflow: "hidden", backgroundColor: backgroundColor },
            containerStyle,
          ]}
        >
          <GestureDetector gesture={pan}>
            <View
              style={[styles.linecontainer, lineContainerStyle]}
              collapsable={false}
            >
              <View style={[styles.line, lineStyle]} />
            </View>
          </GestureDetector>

          <View style={{ flex: 1 }}>
            {content}
          </View>
        </Animated.View>

      </>
    );
  },
);

export default BottomSheetScrollView;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  line: {
    backgroundColor: "gray",
    width: 60,
    height: 4,
    borderRadius: 50,
    marginVertical: 5
  },
  linecontainer: {
    flexDirection: "row",
    justifyContent: "center",
  }
});
