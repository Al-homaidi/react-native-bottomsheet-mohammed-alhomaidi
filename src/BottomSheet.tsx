
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle
} from 'react';
import { Dimensions, Keyboard, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackDrop from './BackDrop';
import {
  BottomSheetMethods,
  BottomSheetProps,
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_BEHAVIOR_CONFIG
} from './BottomSheetTypes';

const BottomSheetScrollView = forwardRef<BottomSheetMethods, BottomSheetProps>(
  ({
    snapTo,
    snapToExpanded,
    expandToFull,
    DropbackgroundColor,
    backgroundColor,
    zIndex,
    content,
    containerStyle,
    lineStyle,
    lineContainerStyle,
    animationConfig,
    enableDragToClose = DEFAULT_BEHAVIOR_CONFIG.enableDragToClose,
    enableDragToExpand = DEFAULT_BEHAVIOR_CONFIG.enableDragToExpand,
    dragThreshold = DEFAULT_BEHAVIOR_CONFIG.dragThreshold,
    enableBackdropClose = DEFAULT_BEHAVIOR_CONFIG.enableBackdropClose,
    tapBackdropToClose = DEFAULT_BEHAVIOR_CONFIG.tapBackdropToClose,
    showDragLine = DEFAULT_BEHAVIOR_CONFIG.showDragLine
  }: BottomSheetProps, ref: React.Ref<BottomSheetMethods>) => {
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

    const CLOSE_THRESHOLD_PIXELS = dragThreshold;

    const defaultExpandConfig = {
      ...DEFAULT_ANIMATION_CONFIG.expand,
      ...animationConfig?.expand
    };

    const defaultCloseConfig = {
      ...DEFAULT_ANIMATION_CONFIG.close,
      ...animationConfig?.close
    };

    const defaultDragConfig = {
      ...DEFAULT_ANIMATION_CONFIG.drag,
      ...animationConfig?.drag
    };

    const expand = useCallback(() => {
      'worklet';
      opacity.value = 1;
      if (expandToFull && snapToExpanded) {
        topAnimation.value = withSpring(expandedHeight, {
          damping: defaultExpandConfig.damping,
          stiffness: defaultExpandConfig.stiffness,
          mass: defaultExpandConfig.mass,
        });
      } else {
        topAnimation.value = withSpring(openHeight, {
          damping: defaultExpandConfig.damping,
          stiffness: defaultExpandConfig.stiffness,
          mass: defaultExpandConfig.mass,
        });
      }
    }, [openHeight, expandedHeight, expandToFull, snapToExpanded, topAnimation, opacity, defaultExpandConfig]);

    const close = useCallback(() => {
      'worklet';
      runOnJS(Keyboard.dismiss)();
      opacity.value = withTiming(0, { duration: defaultCloseConfig.duration });
      topAnimation.value = withTiming(closeHeight, { duration: defaultCloseConfig.duration });
    }, [closeHeight, topAnimation, opacity, defaultCloseConfig]);

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
      .enabled(enableDragToClose || enableDragToExpand)
      .onBegin(() => {
        context.value = topAnimation.value;
      })
      .onUpdate(event => {
        if (event.translationY < 0 && enableDragToExpand) {
          const resistanceFactor = 0.1;
          topAnimation.value = context.value + event.translationY * resistanceFactor;
        } else if (event.translationY > 0 && enableDragToClose) {
          topAnimation.value = context.value + event.translationY;
        }
      })
      .onEnd(() => {
        const pulledDistance = topAnimation.value - context.value;
        if (enableDragToClose && pulledDistance > CLOSE_THRESHOLD_PIXELS) {
          opacity.value = withTiming(0, { duration: defaultCloseConfig.duration });
          topAnimation.value = withTiming(closeHeight, { duration: defaultCloseConfig.duration });
        } else if (enableDragToExpand && snapToExpanded && topAnimation.value < context.value) {
          topAnimation.value = withSpring(expandedHeight, {
            damping: defaultDragConfig.damping,
            stiffness: defaultDragConfig.stiffness,
            mass: defaultDragConfig.mass,
          });
          opacity.value = 1;
        } else {
          opacity.value = 1;
          topAnimation.value = withSpring(context.value, {
            damping: defaultDragConfig.damping,
            stiffness: defaultDragConfig.stiffness,
            mass: defaultDragConfig.mass,
          });
        }
      });

    useEffect(() => {
      if (expandToFull && snapToExpanded) {
        topAnimation.value = withSpring(expandedHeight, {
          damping: defaultExpandConfig.damping,
          stiffness: defaultExpandConfig.stiffness,
          mass: defaultExpandConfig.mass,
        });
        opacity.value = 1;
      }
    }, [expandToFull, snapToExpanded, expandedHeight, topAnimation, opacity]);

    return (
      <>
        {enableBackdropClose && (
          <BackDrop
            topAnimation={topAnimation}
            backDropColor={DropbackgroundColor}
            closeHeight={closeHeight}
            openHeight={openHeight}
            close={tapBackdropToClose ? close : () => { }}
          />
        )}
        <Animated.View
          style={[
            styles.container,
            animationStyle,
            {
              zIndex: zIndex ?? 100,
              paddingBottom: inset.bottom,
              overflow: "hidden",
              backgroundColor: backgroundColor,
            },
            containerStyle,
          ]}
        >
          {(enableDragToClose || enableDragToExpand) && (
            <GestureDetector gesture={pan}>
              <View
                style={[styles.linecontainer, lineContainerStyle]}
                collapsable={false}
              >
                {showDragLine && (
                  <View
                    style={[
                      styles.line,
                      lineStyle
                    ]}
                  />
                )}
              </View>
            </GestureDetector>
          )}

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
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  line: {
    backgroundColor: "gray",
    width: 60,
    height: 4,
    borderRadius: 500,
  },
  linecontainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    zIndex: 100,
    paddingVertical: 10,
  }
});
