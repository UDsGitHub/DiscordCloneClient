import React, { createContext, useState } from "react";

type DirectMessagesProps = {
    children: React.ReactNode
}

export const DirectMessagesContext = createContext<any>(null);

const DirectMessagesProvider = (props: DirectMessagesProps) => {
    const [selectedSidebarTab, setSelectedSidebarTab] = useState(0);
    return (
        <DirectMessagesContext.Provider value={{selectedSidebarTab, setSelectedSidebarTab}}>
            {props.children}
        </DirectMessagesContext.Provider>
    )
}

export default DirectMessagesProvider;