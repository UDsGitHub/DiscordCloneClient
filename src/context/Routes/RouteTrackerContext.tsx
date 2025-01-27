import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface RouteTrackerContextType {
    currentRoute?: string;
    previousRoute?: string;
}

const RouteTrackerContext = createContext<RouteTrackerContextType>({
  currentRoute: undefined,
  previousRoute: undefined
});

const RouteTrackerProvider = ({ children }: {children: React.ReactNode}) => {
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState<string | undefined>(undefined);
  const [previousRoute, setPreviousRoute] = useState<string | undefined>(undefined);

  useEffect(() => {
    setPreviousRoute(currentRoute);
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  return (
    <RouteTrackerContext.Provider value={{ currentRoute, previousRoute }}>
      {children}
    </RouteTrackerContext.Provider>
  );
};

export const useRouteTracker = () => useContext(RouteTrackerContext);

export default RouteTrackerProvider;

