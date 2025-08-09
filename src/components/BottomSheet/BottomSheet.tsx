import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle
} from 'react';
import { Dimensions, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  AnimatedScrollViewProps,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props extends AnimatedScrollViewProps {
  snapTo: string;
  snapToExpanded?: string;
  backgroundColor?: string;
  backDropColor: string;
  expandToFull?: boolean;
  content?: React.ReactNode;
  zIndex?: number;
  backgroundbottomSheet?: string;
}

type BackDropProps = {
  topAnimation: SharedValue<number>;
  openHeight: number;
  closeHeight: number;
  backDropColor: string;
  close: () => void;
};

const BackDrop = ({
  topAnimation,
  openHeight,
  closeHeight,
  backDropColor,
  close,
}: BackDropProps) => {
  const backDropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      topAnimation.value,
      [closeHeight, openHeight],
      [0, 0.5],
    );
    const display = opacity === 0 ? 'none' : 'flex';
    return {
      opacity,
      display,
    };
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        close();
      }}>
      <Animated.View
        style={[
          styles.backDrop,
          backDropAnimation,
          { backgroundColor: backDropColor, zIndex: 1 },
        ]}
      />
    </TouchableWithoutFeedback>
  );
};

export interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
}

const BottomSheet = forwardRef<BottomSheetMethods, Props>(
  ({ snapTo, snapToExpanded, expandToFull, backDropColor, zIndex, content, backgroundbottomSheet }: Props, ref) => {
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
      Keyboard.dismiss();
      opacity.value = withTiming(0, { duration: 300 });
      topAnimation.value = withTiming(closeHeight, { duration: 300 }, (finished) => {
      });
    }, [closeHeight, topAnimation, opacity]);


    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close],
    );


    const animationStyle = useAnimatedStyle(() => {
      return {
        top: topAnimation.value,
        opacity: opacity.value,
      };
    });

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
          backDropColor={backDropColor}
          closeHeight={closeHeight}
          openHeight={openHeight}
          close={close}
        />
        <Animated.View
          style={[
            styles.container,
            animationStyle,
            {
              zIndex: zIndex ?? 100,
              backgroundColor: backgroundbottomSheet,
              paddingBottom: inset.bottom,
              overflow: "hidden",
            },
          ]}>
          <GestureDetector gesture={pan}>
            <View style={styles.Viewline}>
              <View style={styles.line} />
            </View>
          </GestureDetector>
          <View
            style={{ flex: 1 }}>
            {content}
          </View>
        </Animated.View>
      </>
    );
  },
);

export default BottomSheet;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  line: {
    width: 65,
    height: 5,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },
  Viewline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  ViewGestureDetector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "red",
  },
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    display: 'none',
  },
  ViewHead: {
    backgroundColor: "red"
  }
});
