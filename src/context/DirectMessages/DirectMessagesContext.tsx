import React, { createContext, useState } from "react";

type DirectMessagesProps = {
    children: React.ReactNode
}

export const DirectMessagesContext = createContext<any>(null);

const DirectMessagesProvider = (props: DirectMessagesProps) => {
    const [selectedSidebarTab, setSelectedSidebarTab] = useState(0);
    const [dmList, setDmlist] = useState(["James", "Henry", "Daniel", "Martin", "Emem", "Obinna"]);
    return (
        <DirectMessagesContext.Provider value={{selectedSidebarTab, setSelectedSidebarTab, dmList, setDmlist}}>
            {props.children}
        </DirectMessagesContext.Provider>
    )
}

export default DirectMessagesProvider;