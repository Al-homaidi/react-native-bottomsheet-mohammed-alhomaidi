import React, { ReactNode } from 'react';
export type BottomSheetItemType = {
    id: string;
    title?: string;
    snapTo?: string;
    snapToExpanded?: string;
    content?: ReactNode;
    expandToFull?: boolean;
    backDropColor?: string;
    backgroundbottomSheet?: string;
};
interface BottomSheetContextType {
    show: (sheet: Omit<BottomSheetItemType, 'id'>) => void;
    close: (id?: string) => void;
    expandToFull: (id?: string) => void;
}
export declare const useBottomSheet: () => BottomSheetContextType;
export declare const BottomSheetProvider: ({ children }: {
    children: ReactNode;
}) => React.JSX.Element;
export {};
//# sourceMappingURL=BottomSheetContext.d.ts.map