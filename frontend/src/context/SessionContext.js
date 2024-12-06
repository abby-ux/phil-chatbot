// src/context/SessionContext.js
import React, { createContext, useState, useContext } from 'react';

const SessionContext = createContext();

export function SessionProvider({ children }) {
    const [sessionData, setSessionData] = useState({
        userId: null,
        sessionId: null,
        conversationId: null,
        philosophicalPerspective: null
    });

    return (
        <SessionContext.Provider value={{ sessionData, setSessionData }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    return useContext(SessionContext);
}