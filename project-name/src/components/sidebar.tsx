import React, { ReactNode } from 'react';

// 1. Definicja Propsów
// Używamy typu ReactNode, aby komponent mógł przyjmować inną zawartość (inne komponenty, tekst, HTML)
interface SidebarProps {
  children: ReactNode;
}

/**
 * Komponent Sidebar
 * * Służy jako główny kontener dla lewego paska bocznego (nawigacji).
 * Wersja minimalistyczna używa elementu <aside> dla semantyki.
 */
export const Sidebar = ({ children }: SidebarProps) => {
  return (
    // Używamy <aside> zamiast <div> dla lepszej semantyki paska bocznego
    // Nadajemy mu klasę dla łatwego stylowania
    <aside className="app-sidebar-container">
      {/* 'children' jest tutaj renderowane, co oznacza, że 
        cała zawartość umieszczona wewnątrz <Sidebar> w App.tsx pojawi się w tym miejscu.
      */}
      {children}
    </aside>
  );
};

export default Sidebar;