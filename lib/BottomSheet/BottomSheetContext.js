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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomSheetProvider = exports.useBottomSheet = void 0;
const react_1 = __importStar(require("react"));
const BottomSheet_1 = __importDefault(require("./BottomSheet"));
const BottomSheetContext = (0, react_1.createContext)(null);
const useBottomSheet = () => {
    const context = (0, react_1.useContext)(BottomSheetContext);
    if (!context) {
        throw new Error('useBottomSheet must be used within BottomSheetProvider');
    }
    return context;
};
exports.useBottomSheet = useBottomSheet;
const BottomSheetProvider = ({ children }) => {
    const [sheets, setSheets] = (0, react_1.useState)([]);
    const sheetsRef = (0, react_1.useRef)([]);
    const refs = (0, react_1.useRef)({});
    const [expandId, setExpandId] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        sheetsRef.current = sheets;
    }, [sheets]);
    (0, react_1.useEffect)(() => {
        var _a;
        if (expandId) {
            if ((_a = refs.current[expandId]) === null || _a === void 0 ? void 0 : _a.current) {
                refs.current[expandId].current.expand();
                setSheets(prev => prev.map(sheet => sheet.id === expandId ? { ...sheet, expandToFull: true } : sheet));
            }
        }
    }, [expandId]);
    const generateUUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
    const show = (sheetProps, expandFull = false) => {
        const id = generateUUID();
        const ref = react_1.default.createRef();
        refs.current[id] = ref;
        const newSheet = {
            id,
            ...sheetProps,
        };
        setSheets((prev) => [...prev, newSheet]);
        sheetsRef.current = [...sheetsRef.current, newSheet];
        if (expandFull) {
            setExpandId(id);
        }
        else {
            setTimeout(() => {
                var _a, _b;
                (_b = (_a = refs.current[id]) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.expand();
            }, 50);
        }
    };
    const close = (id) => {
        var _a, _b, _c;
        const closeId = id || ((_a = sheetsRef.current[sheetsRef.current.length - 1]) === null || _a === void 0 ? void 0 : _a.id);
        if (!closeId) {
            console.warn("No bottom sheet to close.");
            return;
        }
        (_c = (_b = refs.current[closeId]) === null || _b === void 0 ? void 0 : _b.current) === null || _c === void 0 ? void 0 : _c.close();
        setTimeout(() => {
            setSheets((prev) => prev.filter((s) => s.id !== closeId));
            sheetsRef.current = sheetsRef.current.filter((s) => s.id !== closeId);
            delete refs.current[closeId];
        }, 300);
    };
    const expandToFull = (id) => {
        var _a;
        const currentSheets = sheetsRef.current;
        const targetId = id || ((_a = currentSheets[currentSheets.length - 1]) === null || _a === void 0 ? void 0 : _a.id);
        if (!targetId) {
            console.warn("No bottom sheet available to expand.");
            return;
        }
        setSheets(prev => prev.map(sheet => sheet.id === targetId ? { ...sheet, expandToFull: true } : sheet));
        sheetsRef.current = sheetsRef.current.map(sheet => sheet.id === targetId ? { ...sheet, expandToFull: true } : sheet);
        setTimeout(() => {
            var _a, _b;
            if ((_a = refs.current[targetId]) === null || _a === void 0 ? void 0 : _a.current) {
                (_b = refs.current[targetId].current) === null || _b === void 0 ? void 0 : _b.expand();
            }
            else {
                console.log("Bottom sheet ref not found for ID:", targetId);
            }
        }, 50);
    };
    return (<BottomSheetContext.Provider value={{ show, close, expandToFull }}>
            {children}
            {sheets.map((sheet, index) => {
            var _a;
            return (<BottomSheet_1.default key={sheet.id} ref={refs.current[sheet.id]} snapTo={sheet.snapTo || '40%'} snapToExpanded={sheet.snapToExpanded} expandToFull={(_a = sheet.expandToFull) !== null && _a !== void 0 ? _a : false} zIndex={100 + index} backDropColor={sheet.backDropColor ? sheet.backDropColor : "rgba(0,0,0,0.9)"} content={sheet.content} backgroundbottomSheet={sheet.backgroundbottomSheet ? sheet.backgroundbottomSheet : "#fff"}/>);
        })}
        </BottomSheetContext.Provider>);
};
exports.BottomSheetProvider = BottomSheetProvider;
//# sourceMappingURL=BottomSheetContext.js.map