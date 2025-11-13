"use client";

import { useState, createContext, useContext, ReactNode } from "react";

export type ActiveSection = "all" | "experience" | "projects" | "connect";

interface NavigationContextType {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<ActiveSection>("all");

  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </NavigationContext.Provider>
  );
}
