import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import BottomSheet, {
    BottomSheetMethods,
} from './BottomSheet';

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


const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const useBottomSheet = () => {
    const context = useContext(BottomSheetContext);
    if (!context) {
        throw new Error('useBottomSheet must be used within BottomSheetProvider');
    }
    return context;
};

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
    const [sheets, setSheets] = useState<BottomSheetItemType[]>([]);
    const sheetsRef = useRef<BottomSheetItemType[]>([]);
    const refs = useRef<Record<string, React.RefObject<BottomSheetMethods | null>>>({});
    const [expandId, setExpandId] = useState<string | null>(null);


    useEffect(() => {
        sheetsRef.current = sheets;
    }, [sheets]);

    useEffect(() => {
        if (expandId) {
            if (refs.current[expandId]?.current) {
                refs.current[expandId].current.expand();
                setSheets(prev =>
                    prev.map(sheet =>
                        sheet.id === expandId ? { ...sheet, expandToFull: true } : sheet
                    )
                );
            }
        }
    }, [expandId]);

    const generateUUID = () =>
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });


    const show = (sheetProps: Omit<BottomSheetItemType, 'id'>, expandFull = false) => {
        const id = generateUUID();
        const ref = React.createRef<BottomSheetMethods>();
        refs.current[id] = ref;

        const newSheet: BottomSheetItemType = {
            id,
            ...sheetProps,
        };

        setSheets((prev) => [...prev, newSheet]);
        sheetsRef.current = [...sheetsRef.current, newSheet];

        if (expandFull) {
            setExpandId(id);
        } else {
            setTimeout(() => {
                refs.current[id]?.current?.expand();
            }, 50);
        }
    };

    const close = (id?: string) => {
        const closeId = id || sheetsRef.current[sheetsRef.current.length - 1]?.id;

        if (!closeId) {
            console.warn("No bottom sheet to close.");
            return;
        }

        refs.current[closeId]?.current?.close();
        setTimeout(() => {
            setSheets((prev) => prev.filter((s) => s.id !== closeId));
            sheetsRef.current = sheetsRef.current.filter((s) => s.id !== closeId);
            delete refs.current[closeId];
        }, 300);
    };

    const expandToFull = (id?: string) => {
        const currentSheets = sheetsRef.current;
        const targetId = id || currentSheets[currentSheets.length - 1]?.id;

        if (!targetId) {
            console.warn("No bottom sheet available to expand.");
            return;
        }

        setSheets(prev =>
            prev.map(sheet =>
                sheet.id === targetId ? { ...sheet, expandToFull: true } : sheet
            )
        );

        sheetsRef.current = sheetsRef.current.map(sheet =>
            sheet.id === targetId ? { ...sheet, expandToFull: true } : sheet
        );

        setTimeout(() => {
            if (refs.current[targetId]?.current) {
                refs.current[targetId].current?.expand();
            } else {
                console.log("Bottom sheet ref not found for ID:", targetId);
            }
        }, 50);
    };

    return (
        <BottomSheetContext.Provider value={{ show, close, expandToFull }}>
            {children}
            {sheets.map((sheet, index) => (
                <BottomSheet
                    key={sheet.id}
                    ref={refs.current[sheet.id]}
                    snapTo={sheet.snapTo || '40%'}
                    snapToExpanded={sheet.snapToExpanded}
                    expandToFull={sheet.expandToFull ?? false}
                    zIndex={100 + index}
                    backDropColor={sheet.backDropColor ? sheet.backDropColor : "rgba(0,0,0,0.9)"}
                    content={sheet.content}
                    backgroundbottomSheet={sheet.backgroundbottomSheet ? sheet.backgroundbottomSheet : "#fff"}
                />
            ))}
        </BottomSheetContext.Provider>
    );
};
