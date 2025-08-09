import React from 'react';
import { AnimatedScrollViewProps } from 'react-native-reanimated';
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
export interface BottomSheetMethods {
    expand: () => void;
    close: () => void;
}
declare const BottomSheet: React.ForwardRefExoticComponent<Props & React.RefAttributes<BottomSheetMethods>>;
export default BottomSheet;
//# sourceMappingURL=BottomSheet.d.ts.map