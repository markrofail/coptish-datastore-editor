import { createContext, useContext, useState } from "react";

export const useDrawerState = () => {
    // 'open' controls the visual state of the drawer (expanded/collapsed)
    const [open, setOpen] = useState(false); // Start collapsed
    // 'permanentOpen' tracks if the drawer was explicitly opened by the user
    const [permanentOpen, setPermanentOpen] = useState(false);

    return { open, setOpen, permanentOpen, setPermanentOpen };
};

const DrawerContext = createContext<ReturnType<typeof useDrawerState>>({
    open: false,
    setOpen: () => {},
    permanentOpen: false,
    setPermanentOpen: () => {},
});
export const DrawerContextProvider = DrawerContext.Provider;
export const useDrawerContext = () => useContext(DrawerContext);
