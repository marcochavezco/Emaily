'use client';

import { createContext, useState } from 'react';
import { EmailElementInstance } from '../EmailElements';

type DesignerContextType = {
  elements: EmailElementInstance[];
  addElement: (index: number, element: EmailElementInstance) => void;
  removeElement: (id: string) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = useState<EmailElementInstance[]>([]);

  const addElement = (index: number, element: EmailElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    return setElements((prev) => prev.filter((element) => element.id !== id));
  };

  return (
    <DesignerContext.Provider value={{ elements, addElement, removeElement }}>
      {children}
    </DesignerContext.Provider>
  );
}
