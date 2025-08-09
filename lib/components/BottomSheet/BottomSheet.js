"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const BackDrop = ({ topAnimation, openHeight, closeHeight, backDropColor, close, }) => {
    const backDropAnimation = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const opacity = (0, react_native_reanimated_1.interpolate)(topAnimation.value, [closeHeight, openHeight], [0, 0.5]);
        const display = opacity === 0 ? 'none' : 'flex';
        return {
            opacity,
            display,
        };
    });
    return (<react_native_1.TouchableWithoutFeedback onPress={() => {
            close();
        }}>
      <react_native_reanimated_1.default.View style={[
            styles.backDrop,
            backDropAnimation,
            { backgroundColor: backDropColor, zIndex: 1 },
        ]}/>
    </react_native_1.TouchableWithoutFeedback>);
};
const BottomSheet = (0, react_1.forwardRef)(({ snapTo, snapToExpanded, expandToFull, backDropColor, zIndex, content, backgroundbottomSheet }, ref) => {
    const inset = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const { height } = react_native_1.Dimensions.get('screen');
    const percentage = parseFloat(snapTo.replace('%', '')) / 100;
    const closeHeight = height;
    const openHeight = height - height * percentage;
    const expandedHeight = snapToExpanded
        ? height - height * (parseFloat(snapToExpanded.replace('%', '')) / 100)
        : openHeight;
    const topAnimation = (0, react_native_reanimated_1.useSharedValue)(closeHeight);
    const opacity = (0, react_native_reanimated_1.useSharedValue)(1);
    const context = (0, react_native_reanimated_1.useSharedValue)(0);
    const CLOSE_THRESHOLD_PIXELS = 30;
    const expand = (0, react_1.useCallback)(() => {
        'worklet';
        opacity.value = 1;
        if (expandToFull && snapToExpanded) {
            topAnimation.value = (0, react_native_reanimated_1.withSpring)(expandedHeight, {
                damping: 300,
                stiffness: 300,
            });
        }
        else {
            topAnimation.value = (0, react_native_reanimated_1.withSpring)(openHeight, {
                damping: 300,
                stiffness: 300,
            });
        }
    }, [openHeight, expandedHeight, expandToFull, snapToExpanded, topAnimation, opacity]);
    const close = (0, react_1.useCallback)(() => {
        react_native_1.Keyboard.dismiss();
        opacity.value = (0, react_native_reanimated_1.withTiming)(0, { duration: 300 });
        topAnimation.value = (0, react_native_reanimated_1.withTiming)(closeHeight, { duration: 300 }, (finished) => {
        });
    }, [closeHeight, topAnimation, opacity]);
    (0, react_1.useImperativeHandle)(ref, () => ({
        expand,
        close,
    }), [expand, close]);
    const animationStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        return {
            top: topAnimation.value,
            opacity: opacity.value,
        };
    });
    const pan = react_native_gesture_handler_1.Gesture.Pan()
        .onBegin(() => {
        context.value = topAnimation.value;
    })
        .onUpdate(event => {
        if (event.translationY < 0) {
            const resistanceFactor = 0.1;
            topAnimation.value = context.value + event.translationY * resistanceFactor;
        }
        else {
            topAnimation.value = context.value + event.translationY;
        }
    })
        .onEnd(() => {
        const pulledDistance = topAnimation.value - context.value;
        if (pulledDistance > CLOSE_THRESHOLD_PIXELS) {
            opacity.value = (0, react_native_reanimated_1.withTiming)(0, { duration: 300 });
            topAnimation.value = (0, react_native_reanimated_1.withTiming)(closeHeight, { duration: 300 });
        }
        else if (snapToExpanded && topAnimation.value < context.value) {
            topAnimation.value = (0, react_native_reanimated_1.withSpring)(expandedHeight, {
                damping: 100,
                stiffness: 400,
            });
            opacity.value = 1;
        }
        else {
            opacity.value = 1;
            topAnimation.value = (0, react_native_reanimated_1.withSpring)(context.value, {
                damping: 100,
                stiffness: 400,
            });
        }
    });
    (0, react_1.useEffect)(() => {
        if (expandToFull && snapToExpanded) {
            topAnimation.value = (0, react_native_reanimated_1.withSpring)(expandedHeight, {
                damping: 100,
                stiffness: 400,
            });
            opacity.value = 1;
        }
    }, [expandToFull, snapToExpanded, expandedHeight, topAnimation, opacity]);
    return (<>
        <BackDrop topAnimation={topAnimation} backDropColor={backDropColor} closeHeight={closeHeight} openHeight={openHeight} close={close}/>
        <react_native_reanimated_1.default.View style={[
            styles.container,
            animationStyle,
            {
                zIndex: zIndex !== null && zIndex !== void 0 ? zIndex : 100,
                backgroundColor: backgroundbottomSheet,
                paddingBottom: inset.bottom,
                overflow: "hidden",
            },
        ]}>
          <react_native_gesture_handler_1.GestureDetector gesture={pan}>
            <react_native_1.View style={styles.Viewline}>
              <react_native_1.View style={styles.line}/>
            </react_native_1.View>
          </react_native_gesture_handler_1.GestureDetector>
          <react_native_1.View style={{ flex: 1 }}>
            {content}
          </react_native_1.View>
        </react_native_reanimated_1.default.View>
      </>);
});
exports.default = BottomSheet;
const styles = react_native_1.StyleSheet.create({
    container: {
        ...react_native_1.StyleSheet.absoluteFillObject,
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
        ...react_native_1.StyleSheet.absoluteFillObject,
        display: 'none',
    },
    ViewHead: {
        backgroundColor: "red"
    }
});
//# sourceMappingURL=BottomSheet.js.map